import {Routes, Route } from "react-router-dom";
import './App.css';
import {initializeApp} from "firebase/app";

import SelectAQuarry from "./views/SelectAQuarry";
import NewQuarry from "./views/NewQuarry";
import ConnectSpotify from "./views/ConnectSpotify";
import QuarryFromUrl from "./views/QuarryFromUrl";
import Soup from "./views/Soup";

const style = {
  'display': 'flex',
  justifyContent: 'center'
}

function App() {

    initializeApp({
      apiKey: 'AIzaSyDQfAAJqtKOKXEdRL1SfqS3Pj8VjAIqvzE',
      authDomain: 'music-mining.firebaseapp.com',
      projectId: 'music-mining',
      storageBucket: 'music-mining.appspot.com',
      messagingSenderId: "616247216727",
      appId: "1:616247216727:web:951437741a8d7445b3f112"
    });


  return (
    <div className="App" style={style}>
      <Routes>
        <Route path="/" element={<SelectAQuarry/>}/>
        <Route path="/spotifyConnect" element={<ConnectSpotify/>}/>
        <Route path="/callback" element={<ConnectSpotify/>}/>
        <Route path="/soup/new" element={<NewQuarry/>}/>
        <Route path="/soup/:id" element={<Soup/>}/>
        <Route path="/:phrase" element={<QuarryFromUrl/>}/>
      </Routes>
    </div>
  );
}

export default App;
