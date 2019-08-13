import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// admin.initializeApp();
// const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const actualizarListaTodasPropiedades = functions.firestore
    .document('propiedades/{propiedadId}')
    .onCreate(
        (snapshot: FirebaseFirestore.DocumentSnapshot) => {
            console.log(snapshot);
        }
    );
