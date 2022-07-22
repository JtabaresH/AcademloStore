import { initializeApp } from "firebase/app";
const { dotenv } = require('dotenv')

dotenv
const firebaseConfig = {
    apiKey: "",
    projectId: "",
    storageBucket: "",
    appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
