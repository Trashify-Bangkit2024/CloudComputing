const admin = require('firebase-admin');
const db = admin.firestore();
const bcrypt = require('bcrypt');
require('../../app/firebase');
require('../../app/firestore');

async function LoginUser(email, password) {
  const userRecord = await db.collection('users').where('email', '==', email).get();
  if (userRecord.empty) {
    throw new Error('Login failed');
  }

  const userData = userRecord.docs[0].data();
  const passwordMatch = await bcrypt.compare(password, userData.hashedPassword);
  if (!passwordMatch) {
    throw new Error('Login failed');
  }

  return {
    uid: userRecord.docs[0].id,
    email: userData.email,
    userName: userData.userName
  };
}

module.exports = {LoginUser};

module.exports = {LoginUser};