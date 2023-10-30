
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyCpLfEqvhGAToLDCPy6ezm-aJThkqZ5_jc",
  authDomain: "hotelapp-5217b.firebaseapp.com",
  projectId: "hotelapp-5217b",
  storageBucket: "hotelapp-5217b.appspot.com",
  messagingSenderId: "173900155014",
  appId: "1:173900155014:web:84bc1a4a7d9086878ae907",
  measurementId: "G-HJZLQZJ074"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)


