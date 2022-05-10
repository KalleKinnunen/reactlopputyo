import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Customerlist from './Components/Customerlist';

function App() {
  return (
    <div className="App">
      <h1>Tervetuloa PT-firman sivuille!</h1>
    <Router>
      
      <Link to="/Customerlist">Customerlist</Link>{' '}
     
      <Routes>
     
        <Route path="/Customerlist" element={<Customerlist />} />
        
      </Routes>
      </Router>
    </div>
  );
}

export default App;

