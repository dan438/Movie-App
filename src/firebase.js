import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_ApiKey,
  authDomain: process.env.REACT_APP_AuthDomain,
  projectId: process.env.REACT_APP_ProjectId,
  storageBucket:process.env.REACT_StorageBucket,
  messagingSenderId: process.env.REACT_APP_MessagingSenderId,
  appId: process.env.REACT_APP_ApiId,
  measurementId: process.env.REACT_APP_MeasurementId,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };

export default db;
