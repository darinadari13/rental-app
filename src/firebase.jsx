  import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG } from './constants'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const app = initializeApp(FIREBASE_CONFIG);
export const db = getFirestore(app);
export const storage = getStorage(app);
