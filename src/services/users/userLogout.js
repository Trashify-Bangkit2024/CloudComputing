require('../../app/firebase');
require('../../app/firestore');

async function LogoutUser(uid, session) {
    return new Promise((resolve, reject) => {
      session.destroy(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

module.exports = {LogoutUser};