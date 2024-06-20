const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');
const db = admin.firestore();
require('../../../app/firebase');
require('../../../app/firestore');

async function postHistoryService(uid, history) {
  if (!history) {
    throw new Error('History object is required');
  }
  
  if (!history.foto || !history.namaSampah || !history.jenisSampah || !history.deskripsi) {
    throw new Error('Missing required history properties');
  }

  let now = new Date(Timestamp.now().seconds * 1000);
  let offsetInHours = 7;
  now.setHours(now.getHours() + offsetInHours);
  history.waktu = now.toISOString();

  const userRef = db.collection('users').doc(uid);
  const doc = await userRef.get();

  if (!doc.exists) {
    throw new Error('User not found');
  }

  await userRef.set({ history: admin.firestore.FieldValue.arrayUnion(history) }, { merge: true });

  return { uid, history };
}

async function getHistoryService(uid) {
  if (!uid) {
    throw new Error('Missing uid');
  }

  const userRef = db.collection('users').doc(uid);
  const doc = await userRef.get();

  if (!doc.exists) {
    throw new Error('User not found');
  }

  const userData = doc.data();
  const history = userData.history;

  return { uid, history };
}

module.exports = { postHistoryService, getHistoryService };