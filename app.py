from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import io

app = Flask(__name__)

# Load your trained model
model = load_model('trashify_model.h5')

@app.route('/')
def home():
    return "API saya bisa"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return "No file part"
    
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'

    # Read the image file from the file storage
    image_stream = io.BytesIO(file.read())
    image_stream.seek(0)  # Ensure cursor is at the beginning of the stream

    # Preprocess the image file
    img = load_img(image_stream, target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    # Make prediction
    pred = model.predict(img_array)
    pred_class = np.argmax(pred, axis=1)

    # Convert prediction to class name
    class_names = ['botol', 'kaca', 'kardus', 'kertas', 'metal', 'organic', 'plastic']
    result = class_names[pred_class[0]]

    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)