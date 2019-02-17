import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBPrRWQxgcirVgQSdyt4Oy5ESCsRBwZQys",
    authDomain: "sleepasasymptom.firebaseapp.com",
    databaseURL: "https://sleepasasymptom.firebaseio.com",
    projectId: "sleepasasymptom",
    storageBucket: "sleepasasymptom.appspot.com",
    messagingSenderId: "981585540799"
  };
 
  class Firebase {
      constructor() {
          app.initializeApp(config);

          this.auth = app.auth();
          this.db = app.database();
      }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    getAuthUserId = () =>
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          return user.uid;
        } else {
          return null;
        }
      });


    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    query = table => this.db.ref(`${ table }`);
    researchers = (uid) => this.db.ref(`researchers/${ uid }`);
    study = (id) => this.db.ref(`study/${ id }`);
  }
  export default Firebase;
