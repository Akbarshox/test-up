import React, {useState, useEffect, useContext, createContext} from "react";
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

const authContext = createContext();

export function ProvideAuth({children}) {
   const auth = useProvideAuth();
   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
   return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
   const [user, setUser] = useState(null);
   const [error, setError] = useState(null);
   
   const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
          .then(response => {
             setUser(response.user);
             return response.user;
          })
          .catch(error => console.log('ERROR', error));
   };
   // Wrap any Firebase methods we want to use making sure ...
   // ... to save the user to state.
   
   const signin = (email, password) => {
      return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(response => {
             setUser(response.user);
             return response.user;
          })
          .catch(error => {
             setError(error);
          });
   };
   
   const signup = (name, email, password) => {
      return firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(response => {
             setUser(response.user);
             return response
                 .user.updateProfile({
                    displayName: name,
                 })
          })
          .catch(error => {
             setError(error);
          });
   };
   
   const signout = () => {
      return firebase
          .auth()
          .signOut()
          .then(() => {
             setUser(false);
          })
          .catch(error => {
             setError(error);
          });
   };
   
   const sendPasswordResetEmail = email => {
      return firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(() => {
             return true;
          })
          .catch(error => {
             setError(error);
          });
   };
   
   const confirmPasswordReset = (code, password) => {
      return firebase
          .auth()
          .confirmPasswordReset(code, password)
          .then(() => {
             return true;
          })
          .catch(error => {
             setError(error);
          });
   };
   
   // Subscribe to user on mount
   // Because this sets state in the callback it will cause any ...
   // ... component that utilizes this hook to re-render with the ...
   // ... latest auth object.
   useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
         if (user) {
            setUser(user);
         } else {
            setUser(false);
         }
      });
      
      // Cleanup subscription on unmount
      return () => unsubscribe();
   }, []);
   
   // Return the user object and auth methods
   return {
      user,
      signin,
      signInWithGoogle,
      signup,
      signout,
      sendPasswordResetEmail,
      confirmPasswordReset,
      error,
      setError
   };
}
