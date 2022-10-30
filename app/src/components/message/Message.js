import styled from 'styled-components';

const MarginBottomDiv = styled.div`
  margin-bottom: 30px;
`;

const Username = styled.span`
  font-weight: 500;
`;

const MessageTimestamp = styled.span`
  color: #aaa;
  font-weight: 500;
  font-size: 14px;
  float: right;
`;

const MessageBody = styled.div`
  color: #333;
  margin-top: 5px;
`;

const Fade = styled.span`
  color: #aaa;
`;

function MessageHeader(props) {
  return <>
    <Username>{ props.username }</Username>
    <MessageTimestamp>{ props.timestamp }</MessageTimestamp>
  </>;
}

function Message(props) {
  return <MarginBottomDiv>
    <MessageHeader username={ props.username } timestamp={ props.timestamp } />
    <MessageBody>{ !props.censor ? props.message : <Fade>This message is found to be toxic</Fade> }</MessageBody>
  </MarginBottomDiv>;
}

export default Message;
