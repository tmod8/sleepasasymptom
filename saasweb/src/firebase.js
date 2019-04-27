import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'
import {signOut} from './actions/authActions'

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBPrRWQxgcirVgQSdyt4Oy5ESCsRBwZQys",
    authDomain: "sleepasasymptom.firebaseapp.com",
    databaseURL: "https://sleepasasymptom.firebaseio.com",
    projectId: "sleepasasymptom",
    storageBucket: "sleepasasymptom.appspot.com",
    messagingSenderId: "981585540799"
  };
  app.initializeApp(config);

  export const authRef = app.auth()
  export const researcherRef = app.database().ref("researchers")
  export const studiesRef = app.database().ref("study")
  export const healthDataRef = app.database().ref("health_data")
  export const storageRef = app.storage().ref()
  
  export const EMAIL_PASSWORD_SIGN_IN_METHOD = app.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
  export const EMAIL_LINK_SIGN_IN_METHOD = app.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD

  
  
  authRef.onAuthStateChanged(authUser => {
    return dispatch => {
      if (!authUser) {
        dispatch(signOut())
      } 
    }
  })

 export var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'https://sleepasasymptom.firebaseapp.com/register',
    // This must be true.
    handleCodeInApp: true
  }
   

  
  
