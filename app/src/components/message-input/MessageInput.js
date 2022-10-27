import styled from 'styled-components';

import Button from '../../components/button/Button';

import * as toxicity from '@tensorflow-models/toxicity';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const MessageInputField = styled.textarea`
  width: 100%;
  padding: 20px;
  border: 2px solid ${props => props.toxic ? 'red' : '#ccc'};
  resize: none;
  box-sizing: border-box;
  font-family: 'Noto Sans';

  &:focus-visible {
    outline: none;
    border-radius: 0px;
    border: 2px solid ${props => props.toxic ? 'red' : 'black'};
  }

  &::placeholder {
    font-family: 'Noto Sans';
  }
`;

const AlertMessage = styled.p`
  color: red;
  margin-top: 0px;
  font-size: 13px;
`;

function MessageInput(props) {
  const [toxicityModel, setToxicityModel] = useState();
  const [ message, setMessage ] = useState('');
  const [ toxic, setToxic ] = useState(false);
  const threshold = 0.9;
  const nickname = useSelector((state) => state.nicknameReducer.value);

  useEffect(() => {
    async function loadModel() {
      setToxicityModel(await toxicity.load(threshold));
    }

    loadModel();
  }, []);

  const classifyAndSend = async (e)  => {

    // const predictions = await toxicityModel.classify([message]);
    let currentMessageIsToxic = false;

    // for(let prediction of predictions) {
    //   const [{ match }] = prediction.results;

    //   if (match) currentMessageIsToxic = true;
    // }

    setToxic(false);

    if (!currentMessageIsToxic) {
      props.socketInstance.emit('add-message', {
        nickname,
        timestamp: '10:00 PM',
        message,
      });
      setMessage('');
    }
  };

  return <>
    <MessageInputField
      type="text"
      placeholder="Enter your message here..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      toxic={toxic} />
    <br />

    {
      toxic &&
      <AlertMessage>You message voilates the code of conduct of the chatroom and hence is not published.</AlertMessage>
    }

    <Button onClick={classifyAndSend} disabled={!toxicityModel} float="right">SEND</Button>
  </>
}

export default MessageInput;
