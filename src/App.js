import './App.css';
import Home from './views/Home';
import Catalog from './views/Catalog';
import Admin from './views/Admin';
import Login from './views/Login';
import Offerte from './views/Offerte';
import Registration from './views/Registration';
import ValidateToken from './views/ValidateToken';
import RosePage from './views/RosePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from './context/Context';
import jwt_decode from "jwt-decode";
import NotFound from './views/NotFound';
import Ordine from './views/Ordine';

function App() {
  const token = localStorage.getItem('token');
  let user;
  if (token) {
    user = jwt_decode(token);
  }
  return (
    <UserContext.Provider
      value={user}
    >
      <div className='app'>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/ordine" element={<Ordine />} />
            <Route path="/catalogo/:roseId" element={<RosePage />} />
            <Route path="/catalogo/page/:pageNum" element={<Catalog />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/offerte" element={<Offerte />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrati" element={<Registration />} />
            <Route path="/validateToken/:token" element={<ValidateToken />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
