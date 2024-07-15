import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// INSERT FIREBASE CONFIG HERE
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const app = initializeApp(firebaseConfig);

const Database = getFirestore(app);

export { Database };