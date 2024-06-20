// index.js atau server.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
require('../app/firebase');
require('../app/firestore');
const app = express();

// Konfigurasi Multer untuk menyimpan gambar ke direktori 'uploads'
const upload = multer({ dest: 'uploads/' });

// Fungsi untuk melakukan prediksi dengan model di Cloud Run
async function predictWithCloudRun(imageUrl) {
    const cloudRunUrl = 'https://trashify-model-wqfookijta-et.a.run.app/predict'; // Ganti dengan URL Cloud Run Anda
    const payload = { imageUrl };
  
    try {
      const response = await axios.post(cloudRunUrl, payload);
      return response.data;
    } catch (error) {
      console.error('Error predicting with Cloud Run:', error.response ? error.response.data : error.message);
      throw new Error('Failed to predict with Cloud Run');
    }
  }

module.exports = {predictWithCloudRun};