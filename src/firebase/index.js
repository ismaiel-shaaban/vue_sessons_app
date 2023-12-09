import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDs8rDTJ-9rhKDNfAnbVZ-o_DMOAKihUTM",
  authDomain: "seasons-images.firebaseapp.com",
  projectId: "seasons-images",
  storageBucket: "seasons-images.appspot.com",
  messagingSenderId: "380741013436",
  appId: "1:380741013436:web:b010ca895989b0de66e5b9",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
