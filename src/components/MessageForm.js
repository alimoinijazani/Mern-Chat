import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FiSend } from 'react-icons/fi';
export default function MessageForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="messages-output mb-1"></div>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control placeholder="type message" />
          <Button type="submit">
            <FiSend />
          </Button>
        </InputGroup>
      </form>
    </>
  );
}
