// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFXL3Xli8s4c3IYbtCYgRdH12RZkhVujs",
  authDomain: "creator-testing-75516.firebaseapp.com",
  projectId: "creator-testing-75516",
  storageBucket: "creator-testing-75516.appspot.com",
  messagingSenderId: "572263029966",
  appId: "1:572263029966:web:9237c313ee148edea5049f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;