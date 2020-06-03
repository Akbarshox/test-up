import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyAzsyzpdYrgDAXdp6-cxxeSNbr5rBrwdwM",
   authDomain: "summerclothes-e4c80.firebaseapp.com",
   databaseURL: "https://summerclothes-e4c80.firebaseio.com",
   projectId: "summerclothes-e4c80",
   storageBucket: "summerclothes-e4c80.appspot.com",
   messagingSenderId: "203696582072",
   appId: "1:203696582072:web:51b8fb2f80f2d7e0ac334d",
   measurementId: "G-F69PLDH92N"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();