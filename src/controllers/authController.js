const { registerUser } = require('../services/users/userRegister');
const { LoginUser } = require('../services/users/userLogin');
const { LogoutUser } = require('../services/users/userLogout');
const { updateUserProfile } = require('../services/users/userUpdateProfile');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('../app/firebase');
require('../app/firestore');

async function RegisterController(req, res) {
  const { email, password, confirmPassword, userName } = req.body;
  
  if (password !== confirmPassword) {
    return res.status(400).send({ error: 'Passwords do not match' });
  }

  try {
    const uid = await registerUser(email, password, userName);
    res.status(201).send({ uid });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
}

async function LoginController(req, res) {
  const { email, password } = req.body;
  
  try {
    const uid = await LoginUser(email, password);
    res.status(200).send({ uid });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
}

async function LogoutController(req, res) {
  const { uid } = req.body;
  
  try {
    await LogoutUser(uid, req.session);
    res.status(200).send({ message: 'Logout success' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
}

async function UpdateProfileController(req, res) {
  const uid = req.body.uid;
  const image = req.file.path;

  if (!uid || typeof uid !== 'string') {
    res.status(400).send({ error: 'Invalid uid' });
    return;
  }

  try {
    const imageUrl = await updateUserProfile(uid, image);
    res.status(200).send({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
}

module.exports = {RegisterController, LoginController, LogoutController, UpdateProfileController};