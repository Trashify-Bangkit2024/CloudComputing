const admin = require('firebase-admin');
const db = admin.firestore();
const { uploadToGCS } = require('../gcsupload');
require('../../app/firebase');
require('../../app/firestore');

async function updateUserProfile(uid, file) {
  if (!uid || typeof uid !== 'string') {
    throw new Error('Invalid uid');
  }

  // Upload image to Google Cloud Storage
  const userImageProfile = await uploadToGCS(file);

  // Update the user's profile with the new image URL
  await db.collection('users').doc(uid).update({ userImageProfile });

  return userImageProfile;
}

async function getUserImageProfile(uid) {
  if (!uid || typeof uid !== 'string') {
    throw new Error('Invalid uid');
  }

  const userRecord = await db.collection('users').doc(uid).get();

  if (!userRecord.exists) {
    throw new Error('User not found');
  }

  const userData = userRecord.data();

  return userData.userImageProfile;
}

module.exports = {
  updateUserProfile,
  getUserImageProfile,
};