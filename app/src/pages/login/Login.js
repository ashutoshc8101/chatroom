import Button from "../../components/button/Button";
import TextInput from "../../components/text-input/TextInput";

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyleWrapper = styled.div`
  width: 80%;
  margin: 200px auto;
  text-align: center;
`;

const Margin = styled.div`
  height: ${props => props.height};
`;

function Login() {
  return <StyleWrapper>
    <h1>Welcome to intelligent chat!</h1>
    <Margin height="50px" />
    <TextInput />
    <br />
    <Margin height="15px" />
    <Link to={'/chat'}><Button>Enter Chatroom</Button></Link>
  </StyleWrapper>;
}

export default Login;
