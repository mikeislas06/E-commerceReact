import React from "react";
import { Link } from "react-router-dom";

//Bootstrap
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

//Styles
import "./Header.styles.css";

const Header = ({ cart, total, session, handleLogout }) => {
    const { user } = session;
    return (
        <Navbar
            collapseOnSelect
            expand='lg'
            style={{ backgroundColor: "rgba(31, 78, 78, 0.9)" }}
            variant='dark'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    E-commerce UI
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link as={Link} to='/shop'>
                            Shop
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {user.jwt ? (
                            <>
                                <Nav.Link as={Link} to='/shop-cart'>
                                    🛒 # Items: {cart.length} Total: ${" "}
                                    {total > 0 ? total : "0"}
                                </Nav.Link>
                                <Nav.Link as={Link} to='/account'>
                                    {user.name}
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to='/login'
                                    onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to='/login'>
                                Sign in
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
