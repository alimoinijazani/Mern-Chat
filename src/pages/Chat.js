import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaRestroom } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
export default function Chat() {
  return (
    <Row>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <Col md={4}>
        <div className="my-3 d-flex flex-column h-50">
          <h2>
            Available Rooms <FaRestroom />
          </h2>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between">
              <div>General</div>
              <Badge pill>2</Badge>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className="h-50 d-flex flex-column">
          <h2>
            Available Rooms <FaRestroom />
          </h2>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-start align-items-center gap-3">
                <img src="/pic/1.jpg" alt="" className="profile-pic" />
                <div>name</div>
              </div>
              <Badge pill>2</Badge>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Col>

      <Col md={8}>
        <div></div>
        <InputGroup>
          <Form.Control />
          <Button type="submit">send</Button>
        </InputGroup>
      </Col>
    </Row>
  );
}
