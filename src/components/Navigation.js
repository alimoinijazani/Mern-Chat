import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaRocketchat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useLogoutUserMutation } from '../services/appApi';
export default function Navigation() {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser(user);
    window.location.replace('/');
  };
  return (
    <Navbar bg="light px-3">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            Family Chat <FaRocketchat />
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="d-flex justify-content-around align-items-center  ms-auto">
          <Nav.Item>
            <Link to="/login" className="nav-link">
              Chat
            </Link>
          </Nav.Item>

          {!user && (
            <Nav.Item>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </Nav.Item>
          )}
          {user && (
            <NavDropdown
              title={
                <>
                  <img
                    src={user.picture}
                    alt="profile"
                    className="profile-pic"
                  />
                  {user.name}
                </>
              }
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
