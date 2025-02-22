import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        setUser(user);

        const userData = {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        };
        await axios.post("https://task-management-server-eight-sigma.vercel.app/users", userData);

        setError("");
        toast.success("Successfully login.");
        navigate("/");
      })

      .catch((error) => {
        setError("Failed to login with Google.");
      });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    loading,

    logOut,
    handleGoogleLogin,
    auth,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
