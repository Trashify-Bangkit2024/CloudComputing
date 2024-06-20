const { postHistoryService, getHistoryService } = require('../services/users/history/historyService');
const { predictWithCloudRun } = require('../services/predictoin');

async function postHistory(req, res) {
  const uid = req.params.uid || req.body.uid;
  const history = req.body.history || req.body.historyItem;

  try {
    const result = await postHistoryService(uid, history);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function getHistory(req, res) {
  const uid = req.params.uid;

  try {
    const result = await getHistoryService(uid);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function PredictionModel (req, res) {
  try {
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' });
    }

    // Panggil fungsi untuk melakukan prediksi dengan model di Cloud Run
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const prediction = await predictWithCloudRun(imageUrl);

    // Simpan history pengguna ke Firestore
    const uid = req.body.uid; // Pastikan Anda telah menyertakan uid di body permintaan
    const history = await postHistoryService(uid, imageUrl, prediction);

    res.status(200).send({ prediction });
  } catch (error) {
    console.error('Error uploading image and getting prediction:', error);
    res.status(500).send({ error: 'Failed to process request' });
  }
}

module.exports = { postHistory, getHistory, PredictionModel };