const speech = require('@google-cloud/speech');
const speechClient = new speech.SpeechClient();

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    profanityFilter: false,
    enableWordTimeOffsets: true,
  },
  interimResults: true,
};

module.exports = function(io) {

  io.on('connection', (socket) => {

    let recognizeStream = null;

    socket.on('startGoogleCloudStream', function (data) {
      startRecognitionStream(this, data);
    });

    socket.on('endGoogleCloudStream', function () {
      stopRecognitionStream();
    });

    socket.on('binaryData', function (data) {
      if (recognizeStream !== null) {
        recognizeStream.write(data);
      }
    });

    function startRecognitionStream(client) {
      console.log('starting recognition stream');
      recognizeStream = speechClient
        .streamingRecognize(request)
        .on('error', (error) => {
          console.error(error);
          stopRecognitionStream();
        })
        .on('data', (data) => {
          process.stdout.write(
            data.results[0] && data.results[0].alternatives[0]
              ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
              : '\n\nReached transcription time limit, press Ctrl+C\n'
          );
          socket.emit('speechData', data);

          // if end of utterance, let's restart stream
          // this is a small hack. After 65 seconds of silence, the stream will still throw an error for speech length limit
          if (data.results[0] && data.results[0].isFinal) {
            stopRecognitionStream();
            startRecognitionStream(client);
          }
        });
    }

    function stopRecognitionStream() {
      if (recognizeStream) {
        console.log('stopping recogniziton stream');
        recognizeStream.end();
      }
      recognizeStream = null;
    }

  });
};
