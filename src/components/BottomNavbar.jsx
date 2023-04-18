import Nav from 'react-bootstrap/Nav';

const BottomNavbar = () => {
  return (
    <>
        <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
            <Nav defaultActiveKey="/" className="flex-column">
                <Nav.Link href="/catalogo">Catalogo</Nav.Link>
                <Nav.Link href="/offerte">Offerte</Nav.Link>
            </Nav>
            <Nav className="flex-column">
                <Nav.Link eventKey="link-1" href='/login'>Accedi</Nav.Link>
                <Nav.Link eventKey="link-2" href='/admin'>Admin</Nav.Link>
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