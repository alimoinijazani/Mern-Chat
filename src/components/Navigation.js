import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaRocketchat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
export default function Navigation() {
  return (
    <Navbar bg="light">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            Family Chat <FaRocketchat />
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="ms-auto d-flex justify-content-center align-items-center">
          <Nav.Item>
            <Link to="/chat">Chat</Link>
          </Nav.Item>

          <NavDropdown title="dropdown">
            <NavDropdown.Item>ppppppppppp</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
