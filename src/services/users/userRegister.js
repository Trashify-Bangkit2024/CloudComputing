const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const auth = admin.auth();
const db = admin.firestore();
require('../../app/firebase');
require('../../app/firestore');

async function registerUser(email, password, userName) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userRecord = await auth.createUser({ email, hashedPassword, userName });
  
  if (!userRecord || !userRecord.uid) {
    throw new Error('User creation failed');
  }
  
  await db.collection('users').doc(userRecord.uid).set({ email, hashedPassword, userName });
  
  return userRecord.uid;
}

module.exports = {
  registerUser,
};