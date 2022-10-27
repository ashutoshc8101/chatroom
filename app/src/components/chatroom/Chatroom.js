import MessageInput from '../message-input/MessageInput';
import ConversationFeed from '../conversation-feed/ConversationFeed';
import LogoutButton from '../logout/LogoutButton';
import Nickname from '../nickname/Nickname';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import io from 'socket.io-client';
import { useState } from 'react';
import { addMessage } from '../../store/messagesSlice';

const Content = styled.div`
  width: 80%;
  margin: 20px auto;
`;

function Chatroom() {
  const nickname = useSelector((state) => state.nicknameReducer.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ socketInstance, setSocketInstance ] = useState();

  useEffect(() => {
    if (nickname === '') {
      navigate('/');
    }
  }, [nickname, navigate])

  useEffect(() => {
    const socket = io("http://localhost:5000");

    setSocketInstance(socket);

    socket.on('new-message', (message) => {
      dispatch(addMessage(message));
    });
  }, []);

  return <>
  <LogoutButton />
  <Nickname />
  <Content>
    <ConversationFeed />
    <MessageInput socketInstance={socketInstance} />
  </Content></>;
}

export default Chatroom;
