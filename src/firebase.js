import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDei_P_CCMh3aCRbk-Z7u83r4BvkP_phko",
  authDomain: "netflix-clone-by-kundan.firebaseapp.com",
  projectId: "netflix-clone-by-kundan",
  storageBucket: "netflix-clone-by-kundan.appspot.com",
  messagingSenderId: "855475568986",
  appId: "1:855475568986:web:82a6d822592b95d92ef363",
  measurementId: "G-LVBVJSKEG6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Signup successful!", {
      position: window.innerWidth < 600 ? "top-center" : "top-right",
      autoClose: 3000,
      pauseOnHover: false,
    });
  } catch (error) {
    const errorMessage = error.code.split("/")[1].split("-").join(" ");
    toast.error(errorMessage, {
      position: window.innerWidth < 600 ? "top-center" : "top-right",
      autoClose: 3000,
      pauseOnHover: false,
    });
    console.log(error);
  }
};

// Login
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    toast.success("Login successful!", {
      position: window.innerWidth < 600 ? "top-center" : "top-right",
      autoClose: 3000,
      pauseOnHover: false,
    });
  } catch (error) {
    const errorMessage = error.code.split("/")[1].split("-").join(" ");
    toast.error(errorMessage, {
      position: window.innerWidth < 600 ? "top-center" : "top-right",
      autoClose: 3000,
      pauseOnHover: false,
    });
    console.log(error);
  }
};

// Logout
const logout = async () => {
  await signOut(auth);
  toast.info("Logged out", {
    position: window.innerWidth < 600 ? "top-center" : "top-right",
    autoClose: 2000,
  });
};

export { auth, db, login, signup, logout };
