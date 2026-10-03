"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, firebaseConfigured } from "@/lib/firebase";
import { signInGoogle, signOutUser } from "@/lib/auth";

export function AuthButton() {
  const [user,setUser]=useState<User|null>(null);
  useEffect(()=>auth ? onAuthStateChanged(auth,setUser) : undefined,[]);
  if (!firebaseConfigured) return <span className="hidden text-xs text-slate-500 sm:inline">Demo mode</span>;
  return user ? (
    <button onClick={signOutUser} className="rounded-lg border border-white/10 px-3 py-2 text-xs">Sign out</button>
  ) : (
    <button onClick={signInGoogle} className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black">Google sign in</button>
  );
}
