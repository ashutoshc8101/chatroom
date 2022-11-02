import React, { createContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import { addMessage } from '../store/messagesSlice';
import { speak } from '../text-to-speech/textToSpeech';

export const SocketContext = createContext(null);

function SocketProvider({ children }) {
  let socketRef = useRef();
  let [ws, setWs] = useState();

  const textToSpeechIsEnabled = useSelector(
    (state) => state.textToSpeechIsEnabledReducer.value);
  const dispatch = useDispatch();

  const sendMessage = (messageObj) => {
    socketRef.current.emit('add-message', messageObj);
  };

  const updateSocketObj = () => {
    setWs({
      sendMessage,
      socket: socketRef.current
    });
  };

  const onNewMessage = (messageObj) => {
    if (textToSpeechIsEnabled)
      speak(messageObj);

    dispatch(addMessage(messageObj));
  }

  const updateAllMessages = (messages) => {
    for (let messageObj of messages) {
      dispatch(addMessage(messageObj));
    }
  };

  useEffect(() => {
    if (!socketRef.current || !(socketRef.current && socketRef.current.connected)) {
      socketRef.current = io.connect('http://localhost:5000');

      socketRef.current.on('new-message', onNewMessage);

      socketRef.current.on('disconnect', updateSocketObj);

      socketRef.current.on('connect', updateSocketObj);

      socketRef.current.on('all-messages', updateAllMessages);

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [ textToSpeechIsEnabled ]);

  return (
    ws ? <SocketContext.Provider value={ ws }>
      { children }
    </SocketContext.Provider> : null
  );
}

export default SocketProvider;
