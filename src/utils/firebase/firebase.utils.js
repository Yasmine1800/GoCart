import { initializeApp} from 'firebase/app'
import { getAuth,signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword, signOut,
        onAuthStateChanged  } from 'firebase/auth';

import {getFirestore,
        doc,
        getDoc,
        setDoc,
        collection,
        writeBatch,
        query,
        getDocs,
        queryEqual,
      
      } from 'firebase/firestore'

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
  });


  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async()=>  {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);


  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot)=> {
    const {title, items} = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {displayName:'yasmine'}) => {
    /*first db, second collection, third identifier*/
    if(!userAuth) return;
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
          createdAt,
          ...additionalInformation,
        });
        
      } catch (error) {
        console.log('error creating user', error.messsage);
      }
    }

    return userDocRef;
  }

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);

  };

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);

  }

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);