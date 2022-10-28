import MessageInput from '../message-input/MessageInput';
import ConversationFeed from '../conversation-feed/ConversationFeed';
import LogoutButton from '../logout/LogoutButton';
import Nickname from '../nickname/Nickname';

import styled from 'styled-components';

import { useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import SocketProvider from '../../socket/socket';
import CensorToxicMessages from '../censor-toxic-messages/CensorToxicMessages';

const Content = styled.div`
  width: 80%;
  margin: 20px auto;
`;

const FloatRight = styled.div`
  float: right;
  margin-top: 50px;
  margin-right: 100px;
`;

function Chatroom() {
  const nickname = useSelector((state) => state.nicknameReducer.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (nickname === '') {
      navigate('/');
    }
  }, [nickname, navigate])

  return <>
    <LogoutButton />
    <SocketProvider>
      <FloatRight>
        <CensorToxicMessages />
        <Nickname />
      </FloatRight>
      <Content>
        <ConversationFeed />
          <MessageInput />
      </Content>
    </SocketProvider>
  </>;
}

export default Chatroom;
