// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAE28uOThZI2ZzQqwrlPcvLCVPKP2omwzY",
    authDomain: "b-local-salon-00.firebaseapp.com",
    projectId: "b-local-salon-00",
    storageBucket: "b-local-salon-00.appspot.com",
    messagingSenderId: "824959319443",
    appId: "1:824959319443:web:c854579b6dd51f13a0bc66",
    measurementId: "G-XZX6LWBZFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
export { auth, storage, googleProvider };