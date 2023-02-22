import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD60lXvqLbuhd8o93Sqph1vXVZNRYiXs68",
  authDomain: "crwn-clothing-db-218da.firebaseapp.com",
  projectId: "crwn-clothing-db-218da",
  storageBucket: "crwn-clothing-db-218da.appspot.com",
  messagingSenderId: "110344968081",
  appId: "1:110344968081:web:ca989658c930d33a94ec30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  // if user data not exists
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      console.log(`Error creating user: `, error.message);
    }
  }

  return userDocRef;
};
