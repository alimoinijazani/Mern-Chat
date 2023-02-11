import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin');
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center w-75 mt-5">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div>
        <form onSubmit={handleSubmit}>
          <Form.Group className="my-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
