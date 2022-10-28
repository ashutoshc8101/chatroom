import React, { createContext } from 'react'
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/messagesSlice';
import { useState, useEffect, useRef } from 'react';

export const SocketContext = createContext(null);

function SocketProvider({ children }) {
    let socketRef = useRef();
    let [ws, setWs] = useState();

    const dispatch = useDispatch();

    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";

    const sendMessage = (message) => {
      socketRef.current.emit("add-message", message);
    }

    useEffect(() => {
      if (!socketRef.current || !(socketRef.current && socketRef.current.connected)) {
        socketRef.current = io.connect('http://localhost:5000');

        socketRef.current.on("new-message", (msg) => {
          speech.text = msg.message;
          speech.voice = window.speechSynthesis.getVoices()[2]
          window.speechSynthesis.speak(speech);
          dispatch(addMessage(msg));
        })

        socketRef.current.on('disconnect', () => {
          setWs({
            socket: socketRef.current,
            sendMessage
          });
        })

        socketRef.current.on('connect', () => {
          setWs({
            socket: socketRef.current,
            sendMessage
          });
        });

        setWs({
          socket: socketRef.current,
          sendMessage
        });

        return () => {
          socketRef.current.disconnect();
        }
      }
    }, []);

    return (
        ws && <SocketContext.Provider value={ws}>
          {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;
