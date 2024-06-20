const { registerUser } = require("../services/users/userRegister");
const { LoginUser } = require("../services/users/userLogin");
const { LogoutUser } = require("../services/users/userLogout");
const { updateUserProfile, getUserImageProfile } = require("../services/users/userUpdateProfile");
const { uploadToGCS } = require("../services/gcsupload");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require("../app/firebase");
require("../app/firestore");
const { app } = require("firebase-admin");

async function RegisterController(req, res) {
  const { email, password, confirmPassword, userName } = req.body;
  let userImageProfile = null;

  if (req.file) {
    try {
      console.log('File details:', req.file); // Debugging: Log file information to ensure it's being read correctly
      userImageProfile = await uploadToGCS(req.file);
    } catch (error) {
      console.error('Failed to upload image to Google Cloud Storage:', error);
      return res.status(500).send({ error: 'Failed to upload image to Google Cloud Storage' });
    }
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ error: 'Passwords do not match' });
  }

  try {
    const uid = await registerUser(email, password, userName, userImageProfile);
    res.status(201).send({ uid, userName, email, userImageProfile });
  } catch (error) {
    console.error('Error registering user:', error);
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
    res.status(200).send({ message: "Logout success" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
}

async function UpdateProfileController(req, res) {
  const { uid } = req.params;
  const file = req.file;

  if (!uid || typeof uid !== 'string') {
    return res.status(400).send({ error: 'Invalid uid' });
  }

  if (!file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }

  try {
    const userImageProfile = await updateUserProfile(uid, file);
    res.status(200).send({ userImageProfile });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(400).send({ error: error.message });
  }
}

async function GetUserImageProfileController(req, res) {
  try {
    const uid = req.params.uid;
    const userImageProfile = await getUserImageProfile(uid);
    res.json({ userImageProfile });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

module.exports = {
  RegisterController,
  LoginController,
  LogoutController,
  UpdateProfileController,
  GetUserImageProfileController,
};
