const tf = require("@tensorflow/tfjs-node");

function preprocessImage(imageBuffer) {
  const tfimage = tf.node.decodeImage(imageBuffer, 3); // Decode dari buffer
  const resizedImage = tf.image.resizeBilinear(tfimage, [224, 224]); // Sesuaikan dengan ukuran yang dibutuhkan oleh model
  const expandedImage = resizedImage.expandDims(0); // Tambahkan dimensi batch (batch size 1)
  return expandedImage.toFloat(); // Konversi ke float32 (biasanya dibutuhkan oleh model)
}

module.exports = { preprocessImage };
