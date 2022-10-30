import * as toxicity from '@tensorflow-models/toxicity';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { updateAllMessages } from '../../store/messagesSlice';

const CheckboxWrapper = styled.span`
  margin-right: 50px;
`;

function CensorToxicMessages() {
  const [toxicityModel, setToxicityModel] = useState();
  const [toxicMessagesAreCensored, setToxicMessagesAreCensored] = useState(false);

  const messages = useSelector((state) => state.messagesReducer.value);
  const dispatch = useDispatch();

  const threshold = 0.9;

  useEffect(() => {
    async function loadModel() {
      setToxicityModel(await toxicity.load(threshold));
    }

    loadModel();
  }, []);

  const handleCheckboxChange = async () => {
    let areCensored = toxicMessagesAreCensored;

    setToxicMessagesAreCensored(!areCensored);

    if (areCensored) {
      let newMessages = [];

      for (let message of messages) {
        newMessages.push({ ...message, censor: false });
      }

      dispatch(updateAllMessages(newMessages));
      return;
    }

    const candidateStrings = await messages.map((message) => message.message);

    const predictions = await toxicityModel.classify(candidateStrings);
    let newMessages = [];

    for (let j = 0; j < predictions[6].results.length; j++) {
      if (predictions[6].results[j].match) {
        newMessages.push({ ...messages[j], censor: true });
      } else {
        newMessages.push(messages[j]);
      }
    }

    dispatch(updateAllMessages(newMessages));
  };

  return <CheckboxWrapper>
    <input type="checkbox"
      label="Censor toxic messages"
      checked={ toxicMessagesAreCensored }
      disabled={ !toxicityModel }
      onChange={ handleCheckboxChange } />
    { toxicityModel ? 'Censor Toxic Messages' : 'Model is loading..' }
  </CheckboxWrapper>;
}

export default CensorToxicMessages;
