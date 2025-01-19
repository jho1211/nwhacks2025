// lib/firebase.ts
import admin from "firebase-admin";

import { serverConfig } from "./config.js";

export const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp(serverConfig);

export const db = admin.firestore();