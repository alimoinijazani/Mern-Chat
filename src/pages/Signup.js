import React, { useState, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaPlusCircle } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return { ...state, loadingUpload: false, errorUpload: '' };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

export default function Signup() {
  const [{ loadingUpload }, dispatch] = useReducer(reducer, {
    loadingUpload: false,
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState(null);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert('max size is 1mb');
    } else {
      const bodyFormData = new FormData();
      bodyFormData.append('file', file);
      try {
        dispatch({ type: 'UPLOAD_REQUEST' });
        const { data } = await axios.post('/api/upload', bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        dispatch({ type: 'UPLOAD_SUCCESS' });
        toast.success('uploaded image successfully');
        setImg(data.secure_url);
      } catch (err) {
        toast.error(err);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Row>
      <Col md={7}>
        <div className="d-flex flex-column signup__container-left">
          <h1>Create account</h1>
          <div className="mx-auto position-relative icon__container">
            <img
              src={img ? img : '/pic/noAvatar.png'}
              alt="profile pic"
              className="rounded-circle profile-pic-big"
            />
            <Form.Group className="form-position">
              <Form.Label htmlFor="file">
                <span className="icon-add-pic ">
                  <FaPlusCircle />
                </span>
              </Form.Label>
              <Form.Control
                id="file"
                type="file"
                accept="image/jpg"
                hidden
                onChange={uploadFileHandler}
                required
              />
            </Form.Group>
          </div>
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Button type="submit" disabled={loadingUpload}>
              Signup
            </Button>
          </form>
          <div className="mt-3">
            Already have an account{' '}
            <Link to="/signin" style={{ color: 'green' }}>
              Sign in
            </Link>
          </div>
        </div>
      </Col>

      <Col md={5}>
        <div className="signup__container-right"></div>
      </Col>
    </Row>
  );
}
