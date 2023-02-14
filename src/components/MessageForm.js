import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
export default function MessageForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="messages-output mb-1">
        {!user && <Alert variant="danger">please Login</Alert>}
      </div>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control placeholder="type message" disabled={!user} />
          <Button type="submit" disabled={!user}>
            <FiSend />
          </Button>
        </InputGroup>
      </form>
    </>
  );
}
