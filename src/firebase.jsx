import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'

 const firebaseConfig = {
    apiKey: "AIzaSyAH8IBDvXc5pAywmVobgg5wYm7KbQjRejk",
    authDomain: "rental-app-4af5e.firebaseapp.com",
    projectId: "rental-app-4af5e",
    storageBucket: "rental-app-4af5e.appspot.com",
    messagingSenderId: "1059868195211",
    appId: "1:1059868195211:web:a33c31437b8a1f67f2178e",
    measurementId: "G-T9KJQJ2JXM"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);