import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBbQgRr0qFq8tECbY7G_bVVUTsic5EUxxM",
  authDomain: "react-notes-9770.firebaseapp.com",
  projectId: "react-notes-9770",
  storageBucket: "react-notes-9770.appspot.com",
  messagingSenderId: "693841836623",
  appId: "1:693841836623:web:d98065b9788c2ec65d083a"
};

const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")