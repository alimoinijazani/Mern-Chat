import React, { useState, useContext, useRef, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { AppContext } from './../context/appContext';

export default function MessageForm() {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState('');

  const messageEndRef = useRef(null);

  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);

  useEffect(() => {
    if (messageEndRef) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message, currentRoom]);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }

  const todayDate = getFormattedDate();
  socket.off('room-messages').on('room-messages', (roomMessages) => {
    setMessages(roomMessages);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ':' + minutes;
    //tiem=14:06
    const roomId = currentRoom;
    socket.emit('message-room', roomId, message, user, time, todayDate);
    setMessage('');
  };
  return (
    <>
      <div className="messages-output mb-1">
        {!user && <Alert variant="danger">please Login</Alert>}
        <h3 className=" message-output-title">
          {privateMemberMsg
            ? `${privateMemberMsg.name}`
            : currentRoom || 'General'}
        </h3>
        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center">{date}</p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div
                    key={msgIdx}
                    className={
                      sender.email === user.email
                        ? 'message'
                        : 'incoming-message'
                    }
                  >
                    <div className="d-flex align-items-center p-1 m-1 gap-2 ">
                      <img
                        className="profile-pic"
                        alt=""
                        src={sender.picture}
                      />
                      <p className="p-3 pb-0 d-flex flex-column">
                        {content}

                        <span className="mb-1 " style={{ color: 'grey' }}>
                          {time}
                        </span>
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            placeholder="type message"
            disabled={!user}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button type="submit" disabled={!user}>
            <FiSend />
          </Button>
        </InputGroup>
      </form>
    </>
  );
}
