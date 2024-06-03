
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAfojunl0WTk2kLj2t458y_Yp50ahPRkHg",
  authDomain: "neflix-ebd2a.firebaseapp.com",
  projectId: "neflix-ebd2a",
  storageBucket: "neflix-ebd2a.appspot.com",
  messagingSenderId: "323535771146",
  appId: "1:323535771146:web:1ea4ccdea2946c2df231f3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
try {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, "user"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
  });
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}
const login = async (email, password)=>{
try {
 await signInWithEmailAndPassword(auth, email, password)
} catch (error) {
  console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(" "));
}
}
const logout =()=>{
  signOut (auth);
}
export {auth, db, login, signup, logout};
