// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvkjDfkx4G9MYMesSAsBsrKI72XIFq_48",
  authDomain: "mernbog.firebaseapp.com",
  projectId: "mernbog",
  storageBucket: "mernbog.appspot.com",
  messagingSenderId: "607976703514",
  appId: "1:607976703514:web:a8c879eacbc2196b11b3a3",
  measurementId: "G-Q1DXV2W0CW"
};


export const app = initializeApp(firebaseConfig);

