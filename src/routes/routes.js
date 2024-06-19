const express = require('express');
const router = express.Router();
const {RegisterController, LoginController, LogoutController, UpdateProfileController} = require("../controllers/authController");
const {postHistory, getHistory} = require("../controllers/historyController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('../app/firebase');
require('../app/firestore');

router.post('/auth/register', RegisterController);
router.post('/auth/login', LoginController);
router.post('/auth/logout', LogoutController);
router.post('/user/history', postHistory);
router.get('/user/history/:uid?', getHistory);
router.post('/user/update/:uid?', upload.single('image') ,UpdateProfileController);

module.exports = router;