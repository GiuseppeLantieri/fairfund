import { ConnectButton } from '@rainbow-me/rainbowkit';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarB from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export function Navbar() {
    return (
        <NavbarB expand="lg" className="bg-body-tertiary">
            <Container>
                <NavbarB.Brand href="/" style={{ width: "auto", height: "auto" }}>
                    <img src="/asset/darkgreen.svg" alt="logo" style={{ width: "50px", height: "50px" }} />
                </NavbarB.Brand>
                <NavbarB.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="me-auto" style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                    <Nav.Link href="/raccolte">Le mie Raccolte</Nav.Link>
                    <Nav.Link href="/sostieni">Chi Sostieni</Nav.Link>
                    <Nav.Link href="/crea">Crea Raccolta</Nav.Link>
                    <ConnectButton />
                </Nav>
            </Container>
        </NavbarB>
    );
}
