const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const bucketName = "trashify-model"; // Ensure this is the correct bucket name
const bucket = storage.bucket(bucketName);

async function uploadToGCS(file) {
  const blob = bucket.file(`user-profile/${file.originalname}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype,
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', err => {
      console.error('Error uploading file to GCS:', err);
      reject(err);
    });
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });

    if (file.buffer) {
      console.log('File buffer length:', file.buffer.length);
      blobStream.end(file.buffer);
    } else {
      reject(new Error('File buffer is missing'));
    }
  });
}

module.exports = {uploadToGCS};