import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import { UserContext } from '../context/Context';

const BottomNavbar = () => {
    const {user} = useContext(UserContext);
  return (
    <>
        <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
            <Nav defaultActiveKey="/" className="flex-column">
                <Nav.Link href="/catalogo">Catalogo</Nav.Link>
                <Nav.Link href="/offerte">Offerte</Nav.Link>
            </Nav>
            <Nav className="flex-column">
                <Nav.Link href="/ordine">Ordine</Nav.Link>
                {!user &&
                    <Nav.Link eventKey="link-1" href='/login'>Accedi</Nav.Link>
                }
                {
                    user && user.isAdmin &&
                    <Nav.Link eventKey="link-2" href='/admin'>Admin</Nav.Link>
                }
            </Nav>
        </div>
        <Nav className="flex-column">
            <Nav.Link className="text-center" eventKey="disabled" disabled>
                Mina's Rose Garden - &copy;2023
            </Nav.Link>
        </Nav>
    </>
  );
}

export default BottomNavbar;