import React from "react";
import { auth } from "../firebase";

//Ver tutorial useContext
const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = React.useState(false);

  //Função que faz o sign up (segundo as credenciais do Firebase)
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  //Função que faz o login (segundo as credenciais do Firebase)
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  //Função que faz logout
  function logout() {
    return auth.signOut();
  }

  //Reset Password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  //we just want to run this when we mount our component
  React.useEffect(() => {
    //onAuthStateChange method actually returns a method that, when we call this method, it'll unsubscribe
    //this onAuthStateChange event
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      //We're making sure that we don't render any of our application until we have our current user being set
      //for the very first time
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
