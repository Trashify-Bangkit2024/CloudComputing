const { predictClassification } = require('../services/prediction-model');
const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();
const { preprocessImage } = require('../services/preprocessingimage');

async function predictImage(req, res) {
  try {
    if (!req.file || !req.file.buffer) {
      throw new Error('Image file is missing');
    }

    const imageBuffer = req.file.buffer;
    const uid = req.body.uid; // Assuming uid is passed in the request body

    if (!uid) {
      throw new Error('UID is required');
    }

    // Fetch user data from Firestore
    const userDoc = await firestore.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();

    // Preprocess image
    const processedImage = await preprocessImage(imageBuffer);

    // Predict classification
    const predictionResult = await predictClassification(processedImage, uid, userData);

    res.status(200).json(predictionResult);
  } catch (error) {
    console.error('Error in predictImage:', error);
    res.status(500).json({ error: 'Failed to make prediction' });
  }
}

module.exports = { predictImage };
