# Medical Expert System

## Overview

This is an AI-driven **Medical Expert System** designed to diagnose diseases based on symptoms provided by the user. Using an expert rule-based approach, it suggests possible diagnoses, causes, and treatments.

## Features
- Accepts user-reported symptoms.
- Matches symptoms with known medical conditions.
- Provides potential diagnoses, causes, and treatment suggestions.
- Uses a rule-based inference engine for decision-making.
- Supports Yes/No follow-up questions for refining diagnoses.
- Can be integrated with a chatbot interface

## How the Expert System Works
1. User provides a symptom.
2. System queries the database for matching diseases.
3. If multiple matches, ask follow-up questions.
4. Returns best match diagnosis, cause, and treatment.

## How The System Looks
- ! [Image-1](/TPES/images/mes-1.png)


- ! [Image-2](/TPES/images/mes-2.png)

## Technologies Used
- **Backend:** Python (Flask, Experta, PostgreSQL)
- **Frontend:** React.js, Tailwind CSS
- **Database:** PostgreSQL
- **API Requests:** Axios

## Installation  & Setup

### Prerequisites
Ensure you have the following installed:
- **Python 3.8+**
- **Node.js** (for frontend)
- **PostgreSQL** (for database)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/NaaAbbey/medical-expert-system.git
   cd TPES/backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure the database in `config.py` and apply migrations if needed.
5. Start the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
1. Open your browser and navigate to `http://localhost:5173`
2. Enter a symptom in the input field.
3. Answer follow-up questions as prompted.
4. Receive a diagnosis, cause and treatment suggestions.

## API Endpoints
- **POST /api/predict**: Accepts JSON with symptoms and returns a diagnosis.
  ```json
  {
    "symptoms": "headache"
  }
  ```

- **Response Example:**
  ```json
  {
    "diagnosis": "Migraine",
    "cause": "Stress and dehydration",
    "treatment": "Pain relievers, hydration, rest"
  }
  ```

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Added new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.
