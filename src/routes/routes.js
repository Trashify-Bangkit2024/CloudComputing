const express = require('express');
const router = express.Router();
const {RegisterController, LoginController, LogoutController} = require("../controllers/authController");
const {postHistory, getHistory} = require("../controllers/historyController");
require('../app/firebase');
require('../app/firestore');

router.post('/auth/register', RegisterController);
router.post('/auth/login', LoginController);
router.post('/auth/logout', LogoutController);
router.post('/user/history', postHistory);
router.get('/user/history/:uid?', getHistory);

module.exports = router;