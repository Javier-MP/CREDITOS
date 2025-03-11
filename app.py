from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

creditos = []  

@app.route("/creditos", methods=["POST"])
def registrar_credito():
    data = request.get_json()
    if not data or "cliente" not in data or "monto" not in data:
        return jsonify({"error": "Datos inválidos"}), 400

    creditos.append(data)  
    return jsonify({"mensaje": "Crédito registrado", "data": data}), 201

@app.route("/creditos", methods=["GET"])
def obtener_creditos():
    return jsonify(creditos)  
if __name__ == "__main__":
    app.run(debug=True)
