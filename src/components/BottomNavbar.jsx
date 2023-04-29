import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import { UserContext } from '../context/Context';
import { Link } from 'react-router-dom';

const BottomNavbar = () => {
    const {user} = useContext(UserContext);
  return (
    <>
        <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
            <Nav defaultActiveKey="/" className="flex-column">
                <Nav.Link as={Link} to="/catalogo">Catalogo</Nav.Link>
                <Nav.Link as={Link} to="/offerte">Offerte</Nav.Link>
            </Nav>
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/ordine">Ordine</Nav.Link>
                {!user &&
                    <Nav.Link eventKey="link-1" as={Link} to='/login'>Accedi</Nav.Link>
                }
                {
                    user && user.isAdmin &&
                    <Nav.Link eventKey="link-2" as={Link} to='/admin'>Admin</Nav.Link>
                }
            </Nav>
        </div>
        <Nav className="flex-column">
            <Nav.Link className="text-center" eventKey="disabled" disabled>
                Mina Rose Garden - &copy;2023
            </Nav.Link>
        </Nav>
    </>
  );
}

export default BottomNavbar;