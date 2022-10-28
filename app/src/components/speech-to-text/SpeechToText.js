import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SocketContext } from '../../socket/socket';
import { updateInputMessage } from '../../store/inputMessageSlice';

function SpeechToText() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  let AudioContext,
  context,
  processor,
  input,
  globalStream;

  let streamStreaming = false;

  const constraints = {
    audio: true,
    video: false,
  };

  const initRecording = async () => {
    socket.socket.emit('startGoogleCloudStream', '');
    streamStreaming = true;
    AudioContext = window.AudioContext || window.webkitAudioContext;

    context = new AudioContext({
      latencyHint: 'interactive'
    });

    await context.audioWorklet.addModule('/recorderWorkletProcessor.js')
    context.resume();

    globalStream = await navigator.mediaDevices.getUserMedia(constraints);

    input = context.createMediaStreamSource(globalStream);
    processor = new window.AudioWorkletNode(
      context, 'recorder.worklet'
    );
    processor.connect(context.destination);
    context.resume();
    input.connect(processor);
    processor.port.onmessage = (e) => {
      const audioData = e.data;
      microphoneProcess(audioData);
    };
  };

  const microphoneProcess = (buffer) => {
    socket.socket.emit('binaryData', buffer);
  };

  const startRecording = () => {
    initRecording();
  };

  const stopRecording = () => {
    streamStreaming = false;
    socket.socket.emit('endGoogleCloudStream', '');

    if (globalStream) {
      let track = globalStream.getTracks()[0];
      track.stop();
    }

    if (!input || !processor || !context || !AudioContext) return;

    input.disconnect(processor);
    processor.disconnect(context.destination);

    context.close().then(() => {
      input = null;
      processor = null;
      context = null;
      AudioContext = null;
    });
  };

  useEffect(() => {
    socket.socket.on('speechData', (data) => {
      dispatch(updateInputMessage(data.results[0].alternatives[0].transcript));
    })

    return () => {
      if (streamStreaming) {
        socket.socket.emit('endGoogleCloudStream', '');
      }
    };
  }, []);

  return <>
    <audio />
    <button onClick={startRecording }>Start Recording</button>
    <button onClick={ stopRecording }>Stop Recording</button>
  </>
}

export default SpeechToText;
