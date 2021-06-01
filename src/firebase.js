import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyCJaPjR0qxKHrTe-Hdn8t347m7EGxMtYE4",
    authDomain: "whatsapp-clone-c072b.firebaseapp.com",
    projectId: "whatsapp-clone-c072b",
    storageBucket: "whatsapp-clone-c072b.appspot.com",
    messagingSenderId: "681943422760",
    appId: "1:681943422760:web:21f08f3e14303f0bbf221d",
    measurementId: "G-6GWEPL6XMY"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export  {auth, provider};
export default db;