import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/Sidebar';
import MessageForm from '../components/MessageForm';
export default function Chat() {
  return (
    <Row className="p-1">
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <Col md={4} sm={4} xs={5} className="px-0">
        <Sidebar />
      </Col>

      <Col md={8} sm={8} xs={7} className="px-0 ">
        <MessageForm />
      </Col>
    </Row>
  );
}
