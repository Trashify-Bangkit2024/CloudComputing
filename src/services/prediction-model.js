const tf = require("@tensorflow/tfjs-node");
const { Firestore } = require("@google-cloud/firestore");
const { Storage } = require("@google-cloud/storage");

const firestore = new Firestore();
const storage = new Storage();

const bucketName = "trashify-model"; // Ganti dengan nama bucket Anda

async function predictClassification(imageTensor, uid, userData) {
  try {
    const model = await tf.loadLayersModel(
      `https://storage.googleapis.com/${bucketName}/model-json/model.json`
    );
    
    const prediction = model.predict(imageTensor);
    const probabilities = Array.from(prediction.dataSync()); // Konversi ke array JavaScript

    // Definisikan label-label yang diinginkan
    const labels = [
      "botol plastik",
      "kaca",
      "kardus",
      "kertas",
      "logam",
      "organic",
      "plastik",
    ];

    // Ambil indeks dengan probabilitas tertinggi
    const maxProbabilityIndex = probabilities.indexOf(
      Math.max(...probabilities)
    );
    const predictedLabel = labels[maxProbabilityIndex];

    // Deskripsi, tindakan, dan range harga jual berdasarkan label
    let description = "";
    let action = "";
    let priceRange = "";

    switch (predictedLabel) {
      case "botol plastik":
        description =
          "Plastik yang biasanya digunakan sebagai wadah minuman atau produk lainnya.";
        action =
          "Pisahkan dan kumpulkan botol plastik, pastikan bersih dan kering sebelum didaur ulang.";
        priceRange = "Rp 2.000 - Rp 5.000 per kg";
        break;
      case "kaca":
        description =
          "Bahan yang dapat didaur ulang berulang kali tanpa kehilangan kualitas.";
        action =
          "Pisahkan dan kumpulkan botol kaca serta pecahan kaca lainnya, pastikan bersih dan utuh untuk didaur ulang.";
        priceRange = "Rp 500 - Rp 1.000 per kg";
        break;
      case "kardus":
        description =
          "Bahan serat alami yang biasanya digunakan untuk kemasan.";
        action =
          "Lipat atau hancurkan kardus bekas, pastikan tidak terkontaminasi dengan bahan lain sebelum didaur ulang.";
        priceRange = "Rp 500 - Rp 1.500 per kg";
        break;
      case "kertas":
        description =
          "Bahan yang umum digunakan untuk mencatat, menulis, dan membungkus.";
        action =
          "Pisahkan kertas yang sudah tidak terpakai dan pastikan bersih sebelum didaur ulang.";
        priceRange = "Rp 500 - Rp 1.500 per kg";
        break;
      case "logam":
        description =
          "Material padat yang terdiri dari logam, seperti kaleng atau tutup botol.";
        action =
          "Kumpulkan kaleng dan logam lainnya, pastikan bersih dan kering sebelum dijual ke pengepul sampah.";
        priceRange = "Rp 2.000 - Rp 5.000 per kg";
        break;
      case "organic":
        description =
          "Bahan yang mudah terurai, biasanya berasal dari sisa makanan atau alam.";
        action =
          "Simpan sisa makanan untuk diolah menjadi kompos atau pakan ternak, pastikan tidak mencampur dengan bahan lain.";
        priceRange = "Tidak ada nilai ekonomis (kompos)";
        break;
      case "plastik":
        description =
          "Bahan sintetis yang dapat bertahan lama di lingkungan jika tidak didaur ulang.";
        action =
          "Pisahkan plastik dari sampah lainnya, pastikan bersih dan kering sebelum didaur ulang.";
        priceRange = "Rp 2.000 - Rp 5.000 per kg";
        break;
      default:
        description = "Deskripsi tidak tersedia untuk label ini.";
        action = "Tindakan tidak tersedia untuk label ini.";
        priceRange = "Tidak ada informasi harga untuk label ini.";
    }

    // Konversi Tensor ke Buffer
    const buffer = await tf.node.encodePng(imageTensor.squeeze());

    // Simpan gambar ke dalam bucket GCS
    const bucket = storage.bucket(bucketName);
    const filename = `prediction-image/${uid}/${Date.now()}.png`; // Nama file unik
    const file = bucket.file(filename);

    await file.save(buffer, {
      contentType: "image/png",
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: Date.now(),
        },
      },
    });

    // Gunakan format URL Google Cloud Storage
    const imageUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;


     // Simpan hasil prediksi ke dalam data pengguna berdasarkan UID
     const predictionsCollection = firestore.collection(
      `users/${uid}/predictions`
    );
    await predictionsCollection.add({
      label: predictedLabel,
      probabilities: probabilities,
      description: description,
      action: action,
      priceRange: priceRange,
      imageUrl: imageUrl,
      timestamp: new Date(),
    });

    // Return prediction details
    return {
      label: predictedLabel,
      probabilities: probabilities,
      description: description,
      action: action,
      priceRange: priceRange,
      imageUrl: imageUrl,
      uid: uid,
    };
  } catch (error) {
    console.error("Error during prediction:", error);
    throw new Error("Failed to make prediction");
  }
}

async function getAllPredictions(uid) {
  try {
    const predictionsCollection = firestore.collection(`users/${uid}/predictions`);
    const snapshot = await predictionsCollection.orderBy('timestamp', 'desc').get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    const predictions = [];
    snapshot.forEach(doc => {
      predictions.push(doc.data());
    });

    return {uid, predictions};

  } catch (error) {
    console.error("Error getting predictions:", error);
    throw new Error("Failed to get predictions");
  }
}

module.exports = { predictClassification, getAllPredictions };