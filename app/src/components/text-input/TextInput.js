import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { updateNickname } from '../../store/nicknameSlice';

const StyledTextInput = styled.input`
  padding: 12px;
  border: 2px solid #ccc;
  box-sizing: border-box;
  font-size: 40px;

  &:focus-visible {
    outline: none;
    border: 2px solid black;
  }
`;

function TextInput() {
  const nickname = useSelector((state) => state.nicknameReducer.value);
  const dispatch = useDispatch();

  return <StyledTextInput
            type="text"
            value={nickname}
            onChange={ (e) => { dispatch(updateNickname(e.target.value)) } }
            placeholder="Please enter nickname" />;
}

export default TextInput;
