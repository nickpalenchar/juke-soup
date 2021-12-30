import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import getDatabase from "./database/getDatabase";
import {connectFirestoreEmulator} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import 'bootstrap/dist/css/bootstrap.min.css';

const appConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}
console.log('Initializing Firebase app with config', appConfig)

const app = initializeApp(appConfig);
const db = getDatabase(app);

if (process.env.NODE_ENV === 'production') {
  // TODO prod connection
} else {
  console.log('🔧 connecting firestore emulator for development');
  connectFirestoreEmulator(db, 'localhost', 8080);
  // setTasks([..tasks.slice(0, 1), true, ...tasks.slice(2)]);
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
