import { initializeApp} from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB9xdWHSTgeoj3EA0vTwXg6h2W-6F_rPw8",
    authDomain: "gocart-db-d03c5.firebaseapp.com",
    projectId: "gocart-db-d03c5",
    storageBucket: "gocart-db-d03c5.appspot.com",
    messagingSenderId: "81540662135",
    appId: "1:81540662135:web:ba97a528cc3fece95f9772"
  };
  

  const firebaseApp = initializeApp(firebaseConfig);
  
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    /*first db, second collection, third identifier*/
    const userDocRef = doc(db, 'users', userAuth.uid );

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
        
      } catch (error) {
        console.log('error creating user', error.messsage);
      }
    }

    return userDocRef;
  }