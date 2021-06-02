import firebase from "firebase"


const firebaseConfig = {
    apiKey: "Add your info here",
    authDomain: "Add your info here",
    projectId: "Add your info here",
    storageBucket: "Add your info here",
    messagingSenderId: "Add your info here",
    appId: "Add your info here",
    measurementId: "Add your info here"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export  {auth, provider};
export default db;
