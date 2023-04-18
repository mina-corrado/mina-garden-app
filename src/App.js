import './App.css';
import Home from './views/Home';
import Catalog from './views/Catalog';
import Admin from './views/Admin';
import Login from './views/Login';
import Offerte from './views/Offerte';
import Registration from './views/Registration';
import ValidateToken from './views/ValidateToken';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/offerte" element={<Offerte />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrati" element={<Registration />} />
          <Route path="/validateToken/:token" element={<ValidateToken />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
