import { useSelector } from "react-redux";
import styled from "styled-components";

const FloatRightNickname = styled.span`
  float: right;
  margin-top: 50px;
  margin-right: 100px;
`;

function Nickname() {
  const nickname = useSelector((state) => state.nicknameReducer.value);

  return <FloatRightNickname>{ nickname }</FloatRightNickname>;
}

export default Nickname;
