// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXye2N47Zik8YAZkI1ve0f1aVScZYbrZs",
  authDomain: "qchat-7c9c6.firebaseapp.com",
  databaseURL: "https://qchat-7c9c6-default-rtdb.firebaseio.com",
  projectId: "qchat-7c9c6",
  storageBucket: "qchat-7c9c6.appspot.com",
  messagingSenderId: "724459481058",
  appId: "1:724459481058:web:0dca6290595d0bcfacbbbb"
};

// Initialize Firebase
const firebaseApp = initializeApp( firebaseConfig );

const auth = getAuth(firebaseApp);

async function signupWithEmail(data){
  console.log('UserService.signupWithEmail()');
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((credential) => {
        const user = credential.user;
        console.log(user);
      })
      .catch((error) => {
        console.error('Error ', error.message);
      });
}

export { auth, signupWithEmail }




