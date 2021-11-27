import logo from './logo.svg';
import {Routes, Route, Link} from "react-router-dom";
import './App.css';
import {initializeApp} from "firebase/app";
import { ORM } from './models/orm';

import getDatabase from './database/getDatabase'
import SelectAQuarry from "./views/SelectAQuarry";
import NewQuarry from "./views/NewQuarry";


function App() {

  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyDQfAAJqtKOKXEdRL1SfqS3Pj8VjAIqvzE',
    authDomain: 'music-mining.firebaseapp.com',
    projectId: 'music-mining',
    storageBucket: 'music-mining.appspot.com',
    messagingSenderId: "616247216727",
    appId: "1:616247216727:web:951437741a8d7445b3f112"

  });
  const db = getDatabase();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={SelectAQuarry()}/>
        <Route path="/quarry/new" element={NewQuarry()}/>
        <Route path="/quarry/:id" element={<div>A quarry</div>}/>
      </Routes>
    </div>
  );
}

export default App;
