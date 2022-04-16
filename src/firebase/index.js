import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEqBiR3lXrepFWlraB9bSiyx_xgiHNB8M",
  authDomain: "test-project-616ac.firebaseapp.com",
  projectId: "test-project-616ac",
  storageBucket: "test-project-616ac.appspot.com",
  messagingSenderId: "316780255812",
  appId: "1:316780255812:web:b386507ba0fb0866397a11",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
