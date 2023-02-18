import React, { useContext, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { FaRestroom } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from './../context/appContext';
import { RxDotFilled } from 'react-icons/rx';
import { addNotifications, resetNotifications } from '../features/userSlice';
export default function Sidbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
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

  const joinRoom = (room, isPublic = true) => {
    if (!user) {
      return alert('please login');
    }
    socket.emit('join-room', room, currentRoom);
    setCurrentRoom(room);
    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    //dispatch for notifications
    dispatch(resetNotifications(room));
  };
  socket.off('notifications').on('notifications', (room) => {
    if (currentRoom !== room) dispatch(addNotifications(room));
  });
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
  }, []);

  socket.off('new-user').on(
    'new-user',
    (payload) => {
      setMembers(payload);
    },
    []
  );
  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + '-' + id2;
    } else {
      return id2 + '-' + id1;
    }
  };
  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };

  return (
    <div className="side-container">
      <div className="my-3 d-flex flex-column">
        <h2>
          Available Rooms <FaRestroom />
        </h2>
        {user && (
          <ListGroup>
            {rooms.map((room) => (
              <ListGroup.Item
                key={room}
                className="d-flex justify-content-between"
                onClick={() => joinRoom(room)}
                role="button"
                active={room === currentRoom}
              >
                <div>{room}</div>
                <Badge pill>{user.newMessages[room]}</Badge>
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
                role="button"
                active={privateMemberMsg?._id === m?._id}
                onClick={() => handlePrivateMemberMsg(m)}
              >
                <div className=" d-flex justify-content-start align-items-center gap-2">
                  <div className="position-relative">
                    <img
                      src={m.picture || '/pic/noAvatar.png'}
                      alt=""
                      className="profile-pic"
                    />
                    <RxDotFilled
                      className={
                        m.status === 'online' ? 'icon-online' : 'd-none'
                      }
                    />
                  </div>

                  <div>{m.name}</div>
                </div>
                <Badge pill>
                  {user.newMessages[orderIds(m._id, user._id)]}
                </Badge>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
}
