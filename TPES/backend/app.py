from flask import Flask, request, jsonify
from experta import KnowledgeEngine, Fact
import psycopg2

app = Flask(__name__)

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="your_database",
    user="your_user",
    password="your_password",
    host="localhost",
    port="5432"
)

class TreatmentEngine(KnowledgeEngine):
   # @Rule(Fact(symptom="fever"))
    #def recommend_paracetamol(self):
     #   print("Take paracetamol for fever.")
      #  self.declare(Fact(recommendation="paracetamol"))
    ...

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    symptom = data.get("symptom")

    engine = TreatmentEngine()
    engine.reset()
    engine.declare(Fact(symptom=symptom))
    engine.run()

    # Return a mock response (adapt based on your engine's results)
    return jsonify({"message": "Rule processed", "symptom": symptom})

if __name__ == '__main__':
    app.run(debug=True)
