import {Routes, Route} from "react-router-dom";
import './App.css';
import {initializeApp} from "firebase/app";

import SelectAQuarry from "./views/SelectAQuarry";
import NewSoup from "./views/NewSoup";
import ConnectSpotify from "./views/ConnectSpotify";
import QuarryFromUrl from "./views/QuarryFromUrl";
import Soup from "./views/Soup";
import {AuthUserContext} from "./contexts/AuthUserContext";
import useUser from "./auth/identity";

const style = {
  'display': 'flex',
  justifyContent: 'center'
}

function App() {

  const appConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  initializeApp(appConfig);


  return (
    <div className="App" style={style}>
      {/*TODO: can we wrap elements in a userProvider context??*/}
      <AuthUserContext.Provider value={useUser()}>
        <Routes>
          <Route path="/" element={<SelectAQuarry/>}/>
          <Route path="/spotifyConnect" element={<ConnectSpotify/>}/>
          <Route path="/callback" element={<ConnectSpotify/>}/>
          <Route path="/soup/new" element={<NewSoup/>}/>
          <Route path="/soup/:id" element={<Soup/>}/>
          <Route path="/:phrase" element={<QuarryFromUrl/>}/>
        </Routes>
      </AuthUserContext.Provider>
    </div>
  );
}

export default App;
