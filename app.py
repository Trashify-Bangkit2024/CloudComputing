from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array, load_img

app = Flask(__name__)

# Load your trained model
model = load_model('trashify_model.h5')

@app.route('/predict', methods=['POST'])
def home():
    return "API saya bisa"

def predict():
    if 'file' not in request.files:
        return "No file part"
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        # Preprocess the image file
        img = load_img(file, target_size=(224, 224))
        img = img_to_array(img)
        img = np.expand_dims(img, axis=0) / 255.0

        # Make prediction
        pred = model.predict(img)
        pred_class = np.argmax(pred, axis=1)

        # Convert prediction to class name
        class_names = ['botol', 'kaca', 'kardus', 'kertas', 'metal', 'organic', 'plastic']
        result = class_names[pred_class[0]]

        return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
