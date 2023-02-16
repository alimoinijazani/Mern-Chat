import React, { useContext, useEffect } from 'react';

import Badge from 'react-bootstrap/Badge';

import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { FaRestroom } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { AppContext } from './../context/appContext';
export default function Sidbar() {
  const user = useSelector((state) => state.user);
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);
  useEffect(() => {
    if (user) {
      setCurrentRoom('general');
      const getRooms = async () => {
        try {
          const { data } = await axios.get('/rooms');
          setRooms(data);
        } catch (err) {}
      };
      getRooms();
      socket.emit('join-room', 'general');
      socket.emit('new-user');
    }
  }, [setCurrentRoom, setRooms, socket, user]);

  socket.off('new-user').on(
    'new-user',
    (payload) => {
      setMembers(payload);
    },
    []
  );
  return (
    <div>
      <div className="my-3 d-flex flex-column h-50">
        <h2>
          Available Rooms <FaRestroom />
        </h2>
        {user && (
          <ListGroup>
            {rooms.map((room) => (
              <ListGroup.Item
                key={room}
                className="d-flex justify-content-between"
              >
                <div>{room}</div>
                <Badge pill></Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
      <div className="h-50 d-flex flex-column">
        <h2>
          Members <FaRestroom />
        </h2>
        <ListGroup>
          {members
            .filter((m) => m._id !== user._id)
            .map((m) => (
              <ListGroup.Item
                key={m._id}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex justify-content-start align-items-center gap-3">
                  <img
                    src={m.picture || '/pic/noAvatar.png'}
                    alt=""
                    className="profile-pic"
                  />
                  <div>{m.name}</div>
                </div>
                <Badge pill></Badge>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
}
