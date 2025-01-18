// lib/firebase.ts
import admin from "firebase-admin";

import { serverConfig } from "./config";

export const firebase = admin.apps.length
  ? admin.app()
  : admin.initializeApp(serverConfig);

export const db = admin.firestore();
