import firebase from "firebase";
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDTTdPdwngNz3vauCX-s445Yje88fBTs7o",
  authDomain: "integralassessment.firebaseapp.com",
  databaseURL: "https://integralassessment.firebaseio.com",
  projectId: "integralassessment",
  storageBucket: "integralassessment.appspot.com",
  messagingSenderId: "892031340123",
  appId: "1:892031340123:web:fdaa4fce60d9a12568397e",
  measurementId: "G-THVXQ74FWX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
