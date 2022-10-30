import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logoutIcon from '../../assets/icons/logout.png';

const LogoutIcon = styled.img`
  width: 25px;
  margin-left: 50px;
  margin-top: 50px;
`;

function LogoutButton() {
  return <Link to={ '/' }>
    <LogoutIcon src={ logoutIcon } alt="logout" />
  </Link>;
}

export default LogoutButton;
