import styled from 'styled-components';

const MarginBottomDiv = styled.div`
  margin-bottom: 30px;
`;

const Username = styled.div`
  font-weight: 500;
`;

const MessageTimestamp = styled.div`
  color: #aaa;
  font-weight: 500;
  font-size: 14px;
`;

const MessageBody = styled.div`
  color: #333;
  margin-top: 5px;
`;

function MessageHeader(props) {
  return <>
    <Username>{ props.username }</Username>
    <MessageTimestamp>{ props.timestamp }</MessageTimestamp>
  </>
}

function Message(props) {
  return <MarginBottomDiv>
      <MessageHeader username={props.username} timestamp={props.timestamp} />
      <MessageBody>{ props.message }</MessageBody>
    </MarginBottomDiv>;
}

export default Message;
