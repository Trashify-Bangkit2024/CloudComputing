const { postHistoryService, getHistoryService } = require('../services/users/history/historyService');

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

module.exports = { postHistory, getHistory };