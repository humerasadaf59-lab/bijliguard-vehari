import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, firebaseConfigured } from "./firebase";

export async function signInGoogle() {
  if (!auth || !firebaseConfigured) throw new Error("Firebase Auth is not configured.");
  return signInWithPopup(auth, googleProvider);
}
export async function signOutUser() {
  if (auth) await signOut(auth);
}
