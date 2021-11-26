import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import SelectAQuarry from "./views/SelectAQuarry";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={SelectAQuarry()}/>
        <Route path="/quarry/new" element={<div>A new brand new quarry</div>}/>
        <Route path="/quarry/:id" element={<div>A quarry</div>}/>
      </Routes>
    </div>
  );
}

export default App;
