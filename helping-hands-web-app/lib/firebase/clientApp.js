"use client";

import { initializeApp, getApps } from "firebase/app";
import { firebaseClientConfig } from "./config";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseClientConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
