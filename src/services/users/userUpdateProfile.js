const admin = require('firebase-admin');
const db = admin.firestore();
require('../../app/firebase');
require('../../app/firestore');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

async function updateUserProfile(uid, image) {
  if (!uid || typeof uid !== 'string') {
    throw new Error('Invalid uid');
  }

  // Upload image to Google Cloud Storage
  const bucketName = 'trashify-profileimage';
  const fileName = `${uid}.jpg`;
  await storage.bucket(bucketName).upload(image, { destination: fileName });

  // Get the URL of the uploaded image
  const imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

  // Update the user's profile with the new image URL
  await db.collection('users').doc(uid).update({ imageUrl });

  return imageUrl;
}

module.exports = {
    updateUserProfile,
};