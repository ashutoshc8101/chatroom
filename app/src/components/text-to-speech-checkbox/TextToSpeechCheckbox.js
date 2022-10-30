import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { toggleTextToSpeechIsEnabled } from '../../store/textToSpeechIsEnabledSlice';

const TextToSpeechWrapper = styled.span`
  margin-right: 20px;
`;

function TextToSpeechCheckbox() {
  const textToSpeechIsEnabled = useSelector(
    (state) => state.textToSpeechIsEnabledReducer.value);
  const dispatch = useDispatch();

  return <TextToSpeechWrapper>
    <input type="checkbox"
      label="Text to speech"
      value={textToSpeechIsEnabled}
      onChange={ () => { dispatch(toggleTextToSpeechIsEnabled()) } }
    /> Read out all new messages
  </TextToSpeechWrapper>
}

export default TextToSpeechCheckbox;
