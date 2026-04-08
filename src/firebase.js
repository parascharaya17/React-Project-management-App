import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDlH56GINpBzvzoFnd98uUBZcpl2rHlLso",
  authDomain: "fir-project-01-cb49a.firebaseapp.com",
  projectId: "fir-project-01-cb49a",
  storageBucket: "fir-project-01-cb49a.firebasestorage.app",
  messagingSenderId: "383514726285",
  appId: "1:383514726285:web:be56d72e61596cd332b7c4",
  databaseURL: "https://fir-project-01-cb49a-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);