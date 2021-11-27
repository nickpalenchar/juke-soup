import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import getDatabase from "./database/getDatabase";
import {connectFirestoreEmulator} from "firebase/firestore";
import {initializeApp} from "firebase/app";

initializeApp({
  apiKey: 'AIzaSyDQfAAJqtKOKXEdRL1SfqS3Pj8VjAIqvzE',
  authDomain: 'music-mining.firebaseapp.com',
  projectId: 'music-mining',
  storageBucket: 'music-mining.appspot.com',
  messagingSenderId: "616247216727",
  appId: "1:616247216727:web:951437741a8d7445b3f112"
});

const db = getDatabase();
if (process.NODE_ENV === 'production') {
  // TODO prod connection
} else {
  connectFirestoreEmulator(db, 'localhost', 8080);
  // setTasks([..tasks.slice(0, 1), true, ...tasks.slice(2)]);
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
