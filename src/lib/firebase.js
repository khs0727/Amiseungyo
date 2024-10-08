// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAfm88mVtvRagE5ttJB020fhw5x3QsVGwI',
  authDomain: 'amiseungyo.firebaseapp.com',
  databaseURL: 'https://amiseungyo-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'amiseungyo',
  storageBucket: 'amiseungyo.appspot.com',
  messagingSenderId: '893580590859',
  appId: '1:893580590859:web:c4b9b7df57a1ae4eaaac0e',
  measurementId: 'G-NYTSRCWXHE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export default app;
