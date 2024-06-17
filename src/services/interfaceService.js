const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exception/inputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
 
            const prediction = model.predict(tensor);
            const score = await prediction.data();
            const confidenceScore = Math.max(...score) * 100;
            const classes = ['botol plastic', 'kaca', 'kardus', 'kertas', 'metal', 'organic', 'plastic']; 
 
        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];
 
        let suggestion;
 
  if (label === 'botol plastic') {
    suggestion = "Sampah ini dapat didaur ulang menjadi barang yang baru"
  }
  if (label === 'kaca') {
    suggestion = "Sampah ini dapat didaur ulang menjadi barang yang baru"
  }
  if (label === 'kardus') {
    suggestion = "Sampah ini dapat didaur ulang menjadi barang yang baru"
  }
  if (label === 'kertas') {
    suggestion = "Sampah ini dapat didaur ulang menjadi barang yang baru"
  }
  if (label === 'metal') {
    suggestion = "Sampah ini dapat didaur ulang menjadi barang yang baru"
  }
  if (label === 'organic') {
    suggestion = "Sampah ini dapat didaur ulang menjadi pupuk kompos"
  }
  if (label === 'plastic') {
    suggestion = "Sampah ini dapat didaur ulang menjadi barang yang baru"
  }

  return { confidenceScore, label, suggestion }
    } catch (error) {
        throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`)
    }
}

module.exports = predictClassification;