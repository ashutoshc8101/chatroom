import { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { SocketContext } from '../../socket/socket';

const ColoredDot = styled.span`
  background: ${ props => props.online ? 'green' : 'red' };
  height: 6px;
  width: 6px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 2px;
`;

function Nickname() {
  const nickname = useSelector((state) => state.nicknameReducer.value);
  const ws = useContext(SocketContext);

  return <>{ ws && <ColoredDot online={ ws.socket.connected } /> } { nickname }</>;
}

export default Nickname;
