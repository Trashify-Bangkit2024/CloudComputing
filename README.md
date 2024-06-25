# Trashify Backend

This is the backend for the Trashify project, which helps users identify and manage waste using machine learning. The backend is built with Node.js, Express, and Firebase.

## Table of Contents

- [Cloud Architecture](#cloud-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoint)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Cloud Architecture
<img width="1000" alt="Screenshot 2024-06-25 at 16 14 48" src="https://github.com/Trashify-Bangkit2024/CloudComputing/assets/91829663/4a0422ef-2a43-45f9-943e-f6812fb3fe87">

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/trashify-backend.git
   cd trashify-backend
   ```

2. **Install Depedencies**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
Create a .env file in the root directory and add the necessary environment variables. See [Environment Variables](#environment-variables) for more details.

## Usage
To start the server, run:
   ```bash
   node index.js
   ```
The server will start on the port specified in the environment variables or default to port 8080.


## API Endpoint
To test the various controllers in your Node.js backend using Postman, you can follow the steps below. These steps will help you verify that each endpoint works correctly.

### Register User

**Endpoint:** `POST /auth/register`

**Description:** Registers a new user with a profile image.

**Postman Setup:**
1. Set the request type to `POST`.
2. URL: `http://localhost:8080/auth/register`
3. In the `Body` tab, select `form-data`.
4. Add the following fields:
   - `email`: (type: `text`) User's email.
   - `password`: (type: `text`) User's password.
   - `confirmPassword`: (type: `text`) Confirm user's password.
   - `userName`: (type: `text`) User's name.
   - `userImageProfile`: (type: `file`) Upload a profile image file.

### Login User

**Endpoint:** `POST /auth/login`

**Description:** Logs in a user.

**Postman Setup:**
1. Set the request type to `POST`.
2. URL: `http://localhost:8080/auth/login`
3. In the `Body` tab, select `x-www-form-urlencoded`.
4. Add the following fields:
   - `email`: User's email.
   - `password`: User's password.

### Logout User

**Endpoint:** `POST /auth/logout`

**Description:** Logs out a user.

**Postman Setup:**
1. Set the request type to `POST`.
2. URL: `http://localhost:8080/auth/logout`
3. In the `Body` tab, select `x-www-form-urlencoded`.
4. Add the following fields:
   - `uid`: User's unique ID.

### Update User Profile

**Endpoint:** `POST /user/update`

**Description:** Updates a user's profile with a new image.

**Postman Setup:**
1. Set the request type to `POST`.
2. URL: `http://localhost:8080/user/update`
3. In the `Body` tab, select `form-data`.
4. Add the following fields:
   - `uid`: (type: `text`) User's unique ID.
   - `userImageProfile`: (type: `file`) Upload a new profile image file.

### Get User Profile Image

**Endpoint:** `GET /user/profile/:uid`

**Description:** Gets the user's profile image.

**Postman Setup:**
1. Set the request type to `GET`.
2. URL: `http://localhost:8080/user/profile/{uid}`
   - Replace `{uid}` with the user's unique ID.

### Post History

**Endpoint:** `POST /user/history`

**Description:** Posts a new history entry with an image.

**Postman Setup:**
1. Set the request type to `POST`.
2. URL: `http://localhost:8080/user/history`
3. In the `Body` tab, select `form-data`.
4. Add the following fields:
   - `uid`: (type: `text`) User's unique ID.
   - `history`: (type: `text`) History entry details.
   - `image`: (type: `file`) Upload an image file.

### Get User History

**Endpoint:** `GET /user/history/:uid`

**Description:** Gets history entries for a user.

**Postman Setup:**
1. Set the request type to `GET`.
2. URL: `http://localhost:8080/user/history/{uid}`
   - Replace `{uid}` with the user's unique ID.

### Predict Image

**Endpoint:** `POST /user/predict`

**Description:** Predicts the classification of an uploaded image.

**Postman Setup:**
1. Set the request type to `POST`.
2. URL: `http://localhost:8080/user/predict`
3. In the `Body` tab, select `form-data`.
4. Add the following fields:
   - `uid`: (type: `text`) User's unique ID.
   - `image`: (type: `file`) Upload an image file for prediction.

### Get Prediction

**Endpoint:** `GET /user/predict/:uid`

**Description:** Gets the latest prediction result for a user.

**Postman Setup:**
1. Set the request type to `GET`.
2. URL: `http://localhost:8080/user/predict/{uid}`
   - Replace `{uid}` with the user's unique ID.

### Notes for Testing

- Ensure your server is running locally on `http://localhost:8080`.
- Ensure you have set up your Firebase and Firestore correctly and initialized them in your application.
- Use valid data for testing each endpoint to avoid validation errors.
- Check the console logs for any errors or debugging information if a request fails.

By following these steps, you can thoroughly test each endpoint in your Node.js backend using Postman and ensure that your application is working as expected.

## Dependencies
- @google-cloud/firestore: ^7.8.0
- @hapi/hapi: ^21.3.9
- @tensorflow/tfjs-node: ^4.20.0
- bcrypt: ^5.1.1
- body-parser: ^1.20.2
- cors: ^2.8.5
- dotenv: ^16.4.5
- express: ^4.19.2
- express-session: ^1.18.0
- firebase-admin: ^12.1.1

## Environment Variables
Create a .env file in the root directory of your project and add the following variables:
   ```bash
     TYPE=YOUR-TYPE
     PROJECT_ID=YOUR_PROJECT_ID
     PRIVATE_KEY_ID=YOUR_PRIVATE_KEY_ID
     PRIVATE_KEY=YOUR_PRIVATE_KEY
     CLIENT_EMAIL=YOUR_CLIENT_EMAIL
     CLIENT_ID=YOUR_CLIENT_ID
     AUTH_URI=YOUR_AUTH_URL
     TOKEN_URI=YOUR_TOKEN_URI
     AUTH_PROVIDER_X509_CERT_URL=YOUR_AUTH_PROVIDER_X509_CERT_URL
     CLIENT_X509_CERT_URL=YOUR_CLIENT_X509_CERT_URL
     UNIVErSE_DOMAIN=YOUR_UNIVErSE_DOMAIN
     SESSION_SECRET=YOUR_SESSION_SECRET
     DATABASE_URL=YOUR_DATABASE_URL
     MODEL_URL=YOUR_MODEL_URL
   ```
## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the ISC License.

This README provides an overview of the project, instructions for installation, usage details, a list of API endpoints, information on dependencies, environment variables, and contributing guidelines. Adjust the details according to your project's specifics and add any additional information that might be necessary.
