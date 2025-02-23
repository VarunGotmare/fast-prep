from flask import Flask, request, jsonify
from service.llm_service import generate_docs
from service.doubt_bot import doubt_bot
import requests
from PIL import Image
from io import BytesIO
import os

app = Flask(__name__)
from urllib.parse import urlparse

@app.route('/')
def home():
    return "Flask Server Running"

@app.route('/api/generate', methods=['POST'])
def generate_tutorial():
    try:
        data = request.get_json()
        chapter = data.get("chapter")
        level = data.get("level")
        result = generate_docs(chapter, level)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/doubt',methods=['POST'])
def doubt():
    try:
        data = request.get_json()
        image_url = data.get("image_url")
        input = data.get("input")

        response = requests.get(image_url)
        image = Image.open(BytesIO(response.content))
        if image.mode == 'RGBA':
            image = image.convert('RGB')
        image_path = "temp.jpg"
        image.save(image_path)

        result = doubt_bot(image_path, input)
        if os.path.exists(image_path):
            os.remove(image_path)
        return jsonify(result), 200

    except Exception as error:
        return jsonify({"error": str(error)}), 500



if __name__ == '__main__':
    app.run(debug=True, port=5000)
