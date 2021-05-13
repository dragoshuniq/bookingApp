import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";

import firebase from "firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState({ error: "", message: "" });

  const [loading, setLoading] = useState(true);

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const displayError = (message, type) => {
    setError({ message, type });
    setTimeout(() => {
      resetError();
    }, 5000);
  };

  const resetError = () => {
    setError({ message: "", type: "" });
  };

  async function signUp(email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => displayError(err.message, "signup"));
  }
  async function signIn(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => displayError(err.message, "signin"));
  }

  function signOut() {
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
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
