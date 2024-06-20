const express = require('express');
const router = express.Router();
const {RegisterController, LoginController, LogoutController, UpdateProfileController} = require("../controllers/authController");
const {postHistory, getHistory, PredictionModel} = require("../controllers/historyController");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
require('../app/firebase');
require('../app/firestore');

router.post('/auth/register', upload.single('userImageProfile'), RegisterController);
router.post('/auth/login', LoginController);
router.post('/auth/logout', LogoutController);
router.post('/user/history', postHistory);
router.get('/user/history/:uid?', getHistory);
router.post('/user/update/:uid', upload.single('image') ,UpdateProfileController);
router.post('/user/predict', upload.single('image'), PredictionModel);

module.exports = router;