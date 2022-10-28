import styled from 'styled-components';

import Button from '../../components/button/Button';

import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../socket/socket';
import { updateInputMessage } from '../../store/inputMessageSlice';

import SpeechToText from '../speech-to-text/SpeechToText';

const MessageInputField = styled.textarea`
  width: 100%;
  padding: 20px;
  border: 2px solid '#ccc';
  resize: none;
  box-sizing: border-box;
  font-family: 'Noto Sans';

  &:focus-visible {
    outline: none;
    border-radius: 0px;
    border: 2px solid 'black';
  }

  &::placeholder {
    font-family: 'Noto Sans';
  }
`;

function MessageInput() {
  const nickname = useSelector((state) => state.nicknameReducer.value);
  const inputMessage = useSelector((state) => state.inputMessageReducer.value);
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  const send = async (e) => {
    socket.sendMessage({
      nickname,
      timestamp: (new Date()).toLocaleTimeString([], { timeStyle: 'short' }),
      message: inputMessage,
    });

    dispatch(updateInputMessage(''));
  };

  return <>
    <MessageInputField
      type="text"
      placeholder="Enter your message here..."
      value={inputMessage}
      onChange={(e) => dispatch(updateInputMessage(e.target.value))} />
    <br />
    <SpeechToText />
    <Button onClick={send} disabled={false} float="right">SEND</Button>
  </>
}

export default MessageInput;
