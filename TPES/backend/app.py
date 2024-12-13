from flask import Flask, request, jsonify
from flask_cors import CORS
from experta import KnowledgeEngine, Fact, Rule
#import psycopg2
import pg8000

app = Flask(__name__)
CORS(app)

# Connect to PostgreSQL
#conn = pg8000.connect(
   # dbname="your_database",
   # user="your_user",
   # password="your_password",
    #host="localhost",
    #port="5432"
#)
#cursor = conn.cursor()
#cursor.execute("SELECT * FROM my_table")
#for row in cursor.fetchall():
    #print(row)
#conn.close()

class TreatmentEngine(KnowledgeEngine):
    @Rule(Fact(symptom="fever"))
    def recommend_paracetamol(self):
        print("Take paracetamol for fever.")
        self.declare(Fact(recommendation="paracetamol"))
    ...

@app.route('/api/diagnose', methods=['POST'])
def process():
    symptoms = request.json.get('symptoms', [])
    engine = TreatmentEngine()
    engine.reset()
    for symptom in symptoms:
        engine.declare(Fact(symptom=symptom))
    engine.run()
    recommendation = [fact['recommendation'] for fact in engine.facts.values() if 'recommendation' in fact]
    return jsonify({'recommendation': recommendation})

if __name__ == '__main__':
    app.run(debug=True)
