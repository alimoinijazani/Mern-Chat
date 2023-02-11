import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/Sidebar';
import MessageForm from '../components/MessageForm';
export default function Chat() {
  return (
    <Row>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <Col md={4}>
        <Sidebar />
      </Col>

      <Col md={8}>
        <MessageForm />
      </Col>
    </Row>
  );
}
