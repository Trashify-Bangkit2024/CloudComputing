const express = require('express');
const router = express.Router();
const {RegisterController, LoginController, LogoutController, UpdateProfileController, GetUserImageProfileController} = require("../controllers/authController");
const {postHistory, getHistory } = require("../controllers/historyController");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {predictImage, getPredictionController} = require('../controllers/predictionController')
require('../app/firebase');
require('../app/firestore');

router.post('/auth/register', upload.single('userImageProfile'), RegisterController);
router.post('/auth/login', LoginController);
router.post('/auth/logout', LogoutController);

router.post('/user/history', upload.single('image') , postHistory);
router.get('/user/history/:uid?', getHistory);

router.post('/user/update', upload.single('userImageProfile'), UpdateProfileController);
router.get('/user/profile/:uid', GetUserImageProfileController);

router.post('/user/predict', upload.single('image'), predictImage);
router.get('/user/predict/:uid', getPredictionController);

module.exports = router;