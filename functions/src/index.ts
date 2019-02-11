import * as functions from 'firebase-functions';
const admin = require("firebase-admin")

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// export const helloWorld = functions.https.onRequest((request, response) => {
// response.send("Hello from Firebase!");
// });

exports.createdUser = functions.auth.user().onCreate((user, context) => {
    admin.firestore().doc("users/" + user.uid).set({
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL,
        userPhone: user.phoneNumber
    });
})

exports.deletedUser = functions.auth.user().onDelete((user, context) => {
    admin.firestore().doc("users/" + user.uid).delete();
})