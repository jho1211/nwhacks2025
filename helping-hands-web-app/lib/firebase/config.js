import 'dotenv/config'

const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
  
//   When deployed, there are quotes that need to be stripped
Object.keys(clientConfig).forEach((key) => {
  const configValue = clientConfig[key] + "";
  if (configValue.charAt(0) === '"') {
    clientConfig[key] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseClientConfig = clientConfig;