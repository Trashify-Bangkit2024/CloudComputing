const express = require('express');
const router = express.Router();
const {RegisterController, LoginController, LogoutController, UpdateProfileController, GetUserImageProfileController} = require("../controllers/authController");
const {postHistory, getHistory } = require("../controllers/historyController");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {predictImage} = require('../controllers/predictionController')
require('../app/firebase');
require('../app/firestore');

router.post('/auth/register', upload.single('userImageProfile'), RegisterController);
router.post('/auth/login', LoginController);
router.post('/auth/logout', LogoutController);
router.post('/user/history', upload.single('image') , postHistory);
router.get('/user/history/:uid?', getHistory);
router.post('/user/update/:uid', upload.single('image') ,UpdateProfileController);
router.post('/user/predict', upload.single('image'), predictImage);
router.get('/user/profile/:uid', GetUserImageProfileController)

module.exports = router;