import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";

import firebase from "firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState({ error: "", message: "" });

  const [loading, setLoading] = useState(true);

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        getUser(firebase.auth().currentUser.uid);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function getUser(uid) {
    return firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => setUserData(doc.data()));
  }

  const displayError = (message, type) => {
    setError({ message, type });
    setTimeout(() => {
      resetError();
    }, 5000);
  };

  const resetError = () => {
    setError({ message: "", type: "" });
  };

  async function signUp(email, password, data) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setUserDB(firebase.auth().currentUser.uid, data);
      })
      .catch((err) => displayError(err.message, "signup"));
  }
  async function signIn(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => displayError(err.message, "signin"));
  }

  function signOut() {
    setCurrentUser({});
    return auth.signOut();
  }
  async function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  async function confirmPasswordReset(code, newPassword) {
    return firebase.auth().confirmPasswordReset(code, newPassword);
  }

  async function socialMediaSign(socialMedia) {
    var provider = socialMedia === "google" ? googleProvider : facebookProvider;
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;

        const usr = {
          displayName: user.displayName,
          photo: user.photoURL,
        };
        setUserDB(firebase.auth().currentUser.uid, usr);

        setCurrentUser(user);
        var accessToken = credential.accessToken;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }

  async function setUserDB(uid, user) {
    return firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set(user)
      .catch((e) => console.log(e));
  }

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    resetPassword,
    socialMediaSign,
    error,
    resetError,
    confirmPasswordReset,
    setUserDB,
    userData,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
