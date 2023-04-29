import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.jpg';
import { UserContext } from '../context/Context';
import { FaRegUser, FaSignOutAlt, FaCog, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const TopNavbar = (props) => {
  const count = props.items;
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              width="72"
              height="46"
              className="d-inline-block align-top"
              alt="Mina's logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-100">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/catalogo">Catalogo</Nav.Link>
              <Nav.Link as={Link} to="/offerte">Offerte</Nav.Link>
              <Nav.Link as={Link} to="/ordine"  className='ms-lg-auto'>
              {count > 0 ? 
                <>
                  Ordine(<strong>{count}</strong>) 
                </>
                : 
                <>
                  Ordine ({count})
                </>
              } 
              </Nav.Link>
              <NavDropdown align="end" title="Account" id="basic-nav-dropdown">
                {!user ?
                  <NavDropdown.Item as={Link} to="/login"><FaRegUser size={26}></FaRegUser> Accedi</NavDropdown.Item>
                  :
                  <>
                  <NavDropdown.Item as={Link} to="/account">
                    <FaRegUser size={26}></FaRegUser>
                    <em> {user.nome} {user.cognome}</em>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#logout" onClick={handleLogout}><FaSignOutAlt size={26}></FaSignOutAlt> Logout</NavDropdown.Item>
                  </>
                }
                <NavDropdown.Divider />
                {
                !user && <>
                  <NavDropdown.Item as={Link} to="/registrati">
                  <FaUserPlus size={26}></FaUserPlus> Registrati
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
                }
                {user && user.isAdmin &&
                  <NavDropdown.Item as={Link} to="/admin"><FaCog size={26}></FaCog> Admin</NavDropdown.Item>
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar;