from flask import Flask, request, jsonify
from flask_cors import CORS
from experta import *, Rule
#import psycopg2
from psycopg2.extras import RealDictCursor
import pg8000

app = Flask(__name__)
CORS(app)


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
        self.symptom = symptom
        self.conn = get_db_connection()

    def get_treatment_from_db(self, symptom):
        """Query database for treatment, cause, and disease."""
        with self.conn.cursor() as cur:
            cur.execute(
                "SELECT medicine, causes, disease FROM medical_data WHERE symptoms = %s",
                (symptom,)
            )
            result = cur.fetchone()
            return result

    @Rule(Symptom(name=MATCH.symptom))
    def symptom_rule(self, symptom):
        """Rule to process symptoms."""
        data = self.get_treatment_from_db(symptom)
        if data:
            self.declare(Cause(cause=data["causes"]))
            self.declare(Disease(disease=data["disease"]))
            self.declare(Treatment(treatment=data["medicine"]))


@app.route('/predict', methods=['POST'])
def predict():
    user_input = request.json
    symptoms = user_input.get("symptoms", "").strip()
    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    engine = TreatmentEngine(symptoms)
    engine.reset()
    engine.declare(Symptom(name=symptoms))
    engine.run()

    # Fetch inferred facts
    cause_fact = [fact for fact in engine.facts.values() if isinstance(fact, Cause)]
    disease_fact = [fact for fact in engine.facts.values() if isinstance(fact, Disease)]
    treatment_fact = [fact for fact in engine.facts.values() if isinstance(fact, Treatment)]

    # Prepare response
    response = {
        "cause": cause_fact[0]["cause"] if cause_fact else "No cause found",
        "disease": disease_fact[0]["disease"] if disease_fact else "No disease found",
        "treatment": treatment_fact[0]["treatment"] if treatment_fact else "No treatment found",
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
