const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    const modelUrl = process.env.MODEL_URL;
    if (!modelUrl) {
        throw new Error('MODEL_URL environment variable is not set');
    }
    
    try {
        console.log(`Loading model from URL: ${modelUrl}`);
        const model = await tf.loadGraphModel(modelUrl);
        console.log('Model loaded successfully');
        return model;
    } catch (error) {
        console.error('Error loading model:', error.message);
        console.error('Full error details:', error);
        throw new Error('Failed to load the model');
    }
}

module.exports = loadModel;