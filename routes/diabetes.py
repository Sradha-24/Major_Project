# backend/routes/diabetes.py

from flask import Blueprint, request, jsonify
import joblib
from utils.mapping import map_diabetes_inputs

diabetes_bp = Blueprint("diabetes", __name__)

# Load model and scaler
model = joblib.load("models/diabetes_logistic_model.pkl")
scaler = joblib.load("models/diabetes_scaler.pkl")

@diabetes_bp.route("/", methods=["POST"])

def predict_diabetes():
    user_input = request.json
    input_vector = map_diabetes_inputs(user_input)
    input_scaled = scaler.transform(input_vector)

    prediction = int(model.predict(input_scaled)[0])
    probability = float(model.predict_proba(input_scaled)[0][1])

    explanation = []
    if user_input.get("thirst"): explanation.append("symptom: frequent thirst")
    if user_input.get("frequent_urination"): explanation.append("symptom: frequent urination")
    if user_input.get("tired"): explanation.append("symptom: tiredness")

    return jsonify({
        "prediction": prediction,
        "probability": probability,
        "explanation": explanation
    })
