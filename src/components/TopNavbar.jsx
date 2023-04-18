import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.jpg';

const TopNavbar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
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
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/catalogo">Catalogo</Nav.Link>
              <Nav.Link href="/offerte">Offerte</Nav.Link>
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Accedi</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/registrati">
                  Registrati
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar;