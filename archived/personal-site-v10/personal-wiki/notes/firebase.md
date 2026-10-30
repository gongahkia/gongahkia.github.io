---
category: Tech
---
# Firebase

# `Firebase`

Google's suite of backend services supporting mobile and web app development.

1. [Firestore](https://firebase.google.com/docs/firestore): NoSQL cloud database that stores and syncs user data in real-time
2. [User authentication](https://firebase.google.com/products/auth): Easy implementation of end-to-end identity verification
3. [Cloud storage](https://firebase.google.com/products/storage): Store and serve user-generated content securely
4. [Serverless functions](https://firebase.google.com/products/functions): Backend code run on Firebase servers
5. [Google Cloud app deployment](https://firebase.google.com/products/app-hosting): Full-stack web apps hosted with Google Cloud tools

## Quickstart

```
// ---------- QUICKSTART ----------
    // JS is the main language used to interact with Firebase and its suite of tools
    // below is a brief skeleton to reference when using Firebase's authentication and Firestore in any JS project

// ----- USER AUTHENTICATION -----
    // import firebase from 'firebase/app' => calls the firebase module in your JS app and brings it within local scope
    // import 'firebase/auth' => calls the authentication library firebase provides to your JS app and brings it within local scope
    // .initializeApp(<yourFirebaseConfiguration>) => intiializes the firebase app with the provided configuration saved as a JS object
    // .auth() => initalizes the authentication object within the firebase app, upon which many authentication methods can be called
    // .signInWithEmailAndPassword(<userEmail>, <userPassword>) => handles the authentication process for a login that requires both the user's email and password, called on the authentication object

import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    // blah blah
    // your firebase configuration here
    // blah blah
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    // blah blah
    // if the user signed in successfully
    // blah blah
}).catch((error) => {
    // blah blah
    // handle any errors generated
    // blah blah
});

// ----- FIRESTORE -----
    // import { getFireStore } from 'firebase/firestore/lite' => calls the getFirestore() method in your JS app and brings it within local scope
    // getFireStore(<firebaseAppObject>) => initialises a firestore instance
    // .collection(<collectionName>) => initialises an existing collection in the firestore database into a collection object
    // .doc(<documentName>) => initialises existing documents in the firestore database into a document object
    // .set(<documentValueLiteral>) => adds the specified document value literal to the current document object within the selected collection
    // .get().then((<documentObject>)=>{}) => reads the current document object selected

import { getFirestore } from 'firebase/firestore/lite';
const db = getFirestore(firebaseApp);

const colRef = db.collection('users');
const docRef = colRef.doc('uid');

docRef.set({
    name: 'Bob',
    age: 30
});

docRef.get().then((doc) => {
    if (doc.exists) {
        const data = doc.data();
        console.log(data);
    } else {
        console.log('No such document!');
    }
});
```

## More on

* [set up firebase](https://firebase.google.com/docs/web/setup)
* [firebase console](https://console.firebase.google.com)
* [firebase documentation](https://firebase.google.com/docs)
* [firestore documentation](https://firebase.google.com/docs/firestore)
* [firebase cli](https://firebaseopensource.com/projects/firebase/firebase-tools/)
* [firebase open source](https://firebaseopensource.com/)
* [app development in firebase](https://firebase.google.com/)
