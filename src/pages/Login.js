import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { toast } from 'react-toastify';
import { useLoginUserMutation } from '../services/appApi';
import { useSelector } from 'react-redux';
import { AppContext } from './../context/appContext';
export default function Login() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [navigate, user]);
  // const { socket } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      loginUser({ email, password }).then(({ data }) => {
        if (data) {
          //socket work
          // socket.emit('new-user');
          navigate('/chat');
        }
      });
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
          <Button type="submit" variant="success">
            Login
          </Button>
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
