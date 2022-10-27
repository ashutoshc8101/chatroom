import styled from 'styled-components';

import Message from '../message/Message';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Background = styled.div`
  background-color: #fff;
  height: 65vh;
  overflow: scroll;
  margin-bottom: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

function ConversationFeed() {
  const messages = useSelector((state) => state.messagesReducer.value);

  useEffect(() => {
    // Find a better method to scroll on new messages.
    let ele = document.getElementById('messages-container');
    ele.scrollTop = ele.scrollHeight;
  }, [messages]);

  return <Background id="messages-container">
    {
      messages.map((message, index) =>
        <Message
          key={index}
          username={message.nickname}
          timestamp={message.timestamp}
          message={message.message} />
      )
    }
  </Background>;
}

export default ConversationFeed;
