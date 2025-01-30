from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session  # Import Flask-Session
from experta import * 
import psycopg2
from psycopg2.extras import RealDictCursor
import uuid  # To generate session IDs


app = Flask(__name__)
CORS(app)

# Configure sessions (using filesystem to store data)
app.config["SESSION_TYPE"] = "filesystem"
app.config["SECRET_KEY"] = "supersecretkey"
Session(app)

# Database configuration
DB_CONFIG = {
    "dbname": "medical_data",
    "user": "postgres",
    "password": "elephantry",
    "host": "localhost",
    "port": "5432"
}


def get_db_connection():
    return psycopg2.connect(
        dbname=DB_CONFIG["dbname"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        host=DB_CONFIG["host"],
        port=DB_CONFIG["port"],
        cursor_factory=RealDictCursor,
    )


class Symptom(Fact):
    """Fact to represent a symptom"""
    pass


class Cause(Fact):
    """Fact to represent the cause of a disease"""
    pass


class Disease(Fact):
    """Fact to represent a disease"""
    pass


class Treatment(Fact):
    """Fact to represent the treatment for a disease"""
    pass


class TreatmentEngine(KnowledgeEngine):
    def __init__(self, symptom):
        super().__init__()
        self.conn = get_db_connection()
        self.session_id = session.get("session_id", str(uuid.uuid4()))  # Assign session ID
        session["session_id"] = self.session_id  # Store in session

        # Load existing session data if available, else initialize fresh
        self.symptom = symptom
        self.diagnosis = session.get("diagnosis", None)
        self.treatment = session.get("treatment", None)
        self.cause = session.get("cause", None)
        self.follow_up_symptoms = session.get("follow_up_symptoms", [])
        self.asked_symptom =  [symptom]
        self.next_symptom = session.get("next_symptom", None)
        
    print('restart')
    
    def save_state(self):
        """Save engine state to session"""
        session["diagnosis"] = self.diagnosis
        session["treatment"] = self.treatment
        session["cause"] = self.cause
        session["follow_up_symptoms"] = self.follow_up_symptoms
        session["next_symptom"] = self.next_symptom
        
    def get_treatment_from_db(self, symptom):
        with self.conn.cursor() as cur:
            # Query to find the most common treatment for a symptom
            cur.execute("""
                SELECT treatment, causes, disease, symptoms, COUNT(*) AS frequency
                FROM medical_data
                WHERE symptoms LIKE %s
                GROUP BY treatment, causes, disease, symptoms
                ORDER BY frequency DESC
            """, (f"%{symptom}%",))
            return cur.fetchall()

   
    @Rule(Symptom(symptom=MATCH.symptom))
    def symptom_rule(self, symptom):
        """Rule to process symptoms."""
        print("current: ",self.next_symptom)
        data  = self.get_treatment_from_db(symptom)
        if data:
            all_symptoms = set()
            for row in data:
                pending_symptoms = [s.strip() for s in row['symptoms'].split(', ') if s != symptom] 
                all_symptoms.update(pending_symptoms)
            self.follow_up_symptoms = list(all_symptoms) ## all possible secondary symptoms 
            print('results: ', self.follow_up_symptoms) 
            self.next_symptom = self.follow_up_symptoms.pop(0) if self.follow_up_symptoms else None    
        else:
            return jsonify({"message": "No matching disease found"})
        self.save_state()
        
    
    def refine_diagnosis(self, current_symptom, response):
        """Refine diagnosis based on user's follow-up responses"""
        #self.save_state()
        data  = self.get_treatment_from_db(self.symptom)
        print(self.follow_up_symptoms)
        
        if response.lower() == "yes":
            matching_diseases = [d for d in data if set(self.asked_symptom + [current_symptom]).issubset(set(d['symptoms'].split(', ')))]
            if matching_diseases:
                best_match = max(matching_diseases, key=lambda d: d['frequency'])
                self.diagnosis = best_match['disease']
                self.treatment = best_match['treatment']
                self.cause = best_match['causes']
            return

        # If "no", continue checking the next symptom in the list
        elif response.lower() == 'no':
            
            if self.follow_up_symptoms:
                
                print('before: ', self.follow_up_symptoms)
                self.next_symptom = self.follow_up_symptoms.pop(0)     
            else:
                print(self.asked_symptom)
                # No more symptoms to check, diagnose based on the initial symptom alone
                matching_diseases = [d for d in data if self.symptom in d['symptoms']]
                #print(matching_diseases)
                if matching_diseases:
                    best_match = max(matching_diseases, key=lambda d: d['frequency'])
                    self.diagnosis = best_match['disease']
                    self.treatment = best_match['treatment']
                    self.cause = best_match['causes']
                else:
                    print(matching_diseases)
                    return jsonify({"message": "No matching disease found"}) 
                return
        self.save_state()
        
        
@app.route('/api/predict', methods=['POST'])
def predict():
    user_input = request.json
    answer=''
    symptom = user_input.get("symptoms", "")['symptom']
    if len(user_input.get("symptoms")) == 2:
        answer = user_input.get("symptoms")['answer']
    if not symptom:
        return jsonify({"error": "No symptoms provided"}), 400
        
    engine = TreatmentEngine(symptom)
    
    if not answer:
        engine.reset()
        engine.declare(Symptom(symptom=symptom))
    else:
        print(answer)
        engine.refine_diagnosis(engine.next_symptom, answer)

    engine.run()
    if engine.diagnosis and engine.treatment and engine.cause:
        return jsonify({
            "diagnosis": engine.diagnosis,
            "treatment": engine.treatment, 
            "cause": engine.cause
        })
    elif engine.next_symptom:
        print(engine.next_symptom)
        return jsonify({
            "question": f"Do you also experience {engine.next_symptom}?"
        })
    else:
        return jsonify({
            "message": "No match found. Please consult a doctor."
        })
   
            
@app.route('/api/reset', methods=['POST'])
def reset_session():
    """Clears stored session data after a page reload"""
    session.clear()
    return jsonify({"message": "Session reset successfully."})


if __name__ == '__main__':
    app.run(debug=True, port=5000) 
