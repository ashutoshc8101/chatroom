import styled from 'styled-components';

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 12px 25px;
  outline: none;
  border: 0px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  float: ${ props => props.float ? props.float : 'none' };

  &:disabled {
    background-color: #555;
  }
`;

export default Button;
