const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucketName = "your-bucket-name"; // Replace with your GCS bucket name

async function uploadImageToGCS(imageBuffer, uid) {
  try {
    const fileName = `${uid}-${Date.now()}.jpg`; // Unique file name
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(`prediction-image/${fileName}`);

    await file.save(imageBuffer, {
      metadata: {
        contentType: "image/jpeg",
      },
    });

    console.log(`File ${fileName} uploaded to bucket ${bucketName}`);

    // Get public URL of the uploaded image
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;
    return publicUrl;
  } catch (error) {
    console.error("Error uploading image to GCS:", error);
    throw new Error("Failed to upload image to GCS");
  }
}

module.exports = { uploadImageToGCS };
