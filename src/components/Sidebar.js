import React from 'react';

import Badge from 'react-bootstrap/Badge';

import ListGroup from 'react-bootstrap/ListGroup';

import { FaRestroom } from 'react-icons/fa';
import { useSelector } from 'react-redux';
export default function Sidbar() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className="my-3 d-flex flex-column h-50">
        <h2>
          Available Rooms <FaRestroom />
        </h2>
        {user && (
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between">
              <div>General</div>
              <Badge pill>2</Badge>
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="h-50 d-flex flex-column">
        <h2>
          Members <FaRestroom />
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
    </div>
  );
}
