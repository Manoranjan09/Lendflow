import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider,} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpB_choauiOO2HQaCIsf_Tp5bWjcAlCpU",
  authDomain: "creditflow-ai-1abc1.firebaseapp.com",
  projectId: "creditflow-ai-1abc1",
  storageBucket: "creditflow-ai-1abc1.firebasestorage.app",
  messagingSenderId: "121509982164",
  appId: "1:121509982164:web:f2f377e5f51d1133a0b041",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
