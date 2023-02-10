import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="d-flex flex-column justify-content-center w-75 mt-5">
      <div>
        <form onSubmit={handleSubmit}>
          <Form.Group className="my-2">
            <Form.Label>Username</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Button variant="success">Login</Button>
        </form>
      </div>
      <div className="my-5">
        don't have an account?
        <Link to="/signup">
          {' '}
          <i style={{ color: 'green' }}>Signup here</i>
        </Link>{' '}
      </div>
    </div>
  );
}
