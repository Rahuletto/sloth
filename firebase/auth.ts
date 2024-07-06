
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,

} from "firebase/auth";
import { auth } from "./config";
import { authErrors } from "./errors";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error:any) {
    var errorCode = error.code.replace("auth/", "");
    throw authErrors[errorCode];
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during sign out:", error);
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser!)
  } catch (error: any) {
    var errorCode = error.code.replace("auth/", "");
    throw authErrors[errorCode];
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    var errorCode = error.code.replace("auth/", "");
    throw authErrors[errorCode];
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    var errorCode = error.code.replace("auth/", "");
    throw authErrors[errorCode];
  }
}
