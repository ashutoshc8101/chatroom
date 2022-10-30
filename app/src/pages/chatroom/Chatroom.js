import { useEffect } from 'react';
import { useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CensorToxicMessages from '../../components/censor-toxic-messages/CensorToxicMessages';
import ConversationFeed from '../../components/conversation-feed/ConversationFeed';
import LogoutButton from '../../components/logout/LogoutButton';
import MessageInput from '../../components/message-input/MessageInput';
import Nickname from '../../components/nickname/Nickname';
import TextToSpeechCheckbox from '../../components/text-to-speech-checkbox/TextToSpeechCheckbox';
import SocketProvider from '../../socket/socket';

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
  }, [nickname, navigate]);

  return <>
    <LogoutButton />
    <SocketProvider>
      <FloatRight>
        <TextToSpeechCheckbox />
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
