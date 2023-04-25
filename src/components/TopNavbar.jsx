import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.jpg';
import { UserContext } from '../context/Context';

const TopNavbar = (props) => {
  const count = props.items;
  const user = useContext(UserContext)
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/catalogo">Catalogo</Nav.Link>
              <Nav.Link href="/offerte">Offerte</Nav.Link>
              <Nav.Link href="/ordine"  className='ms-lg-auto'>Ordine ({count})</Nav.Link>
              <NavDropdown align="end" title="Account" id="basic-nav-dropdown">
                {!user ?
                  <NavDropdown.Item href="/login">Accedi</NavDropdown.Item>
                  :
                  <NavDropdown.Item href="/account"><em>{user.nome} {user.cognome}</em></NavDropdown.Item>
                }
                <NavDropdown.Divider />
                {
                !user && <>
                  <NavDropdown.Item href="/registrati">
                  Registrati
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
                }
                {user && user.isAdmin &&
                  <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
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