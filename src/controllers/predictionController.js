const { predictClassification } = require('../services/prediction-model');
const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();
const { preprocessImage } = require('../services/preprocessingimage');
const { getAllPredictions } = require('../services/prediction-model');

async function predictImage(req, res) {
  try {
    if (!req.file || !req.file.buffer) {
      throw new Error('Image file is missing');
    }

    const imageBuffer = req.file.buffer;
    const uid = req.body.uid;

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

async function getPredictionController(req, res) {
  try {
    const uid = req.params.uid;
    const predictionData = await getAllPredictions(uid);

    if (!predictionData) {
      return res.status(404).json({ message: 'No prediction data found for this user.' });
    }

    return res.status(200).json(predictionData);

  } catch (error) {
    console.error("Error getting prediction:", error);
    return res.status(500).json({ message: 'Failed to get prediction.' });
  }
}

module.exports = { predictImage, getPredictionController };