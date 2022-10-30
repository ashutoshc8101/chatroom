let speech = new SpeechSynthesisUtterance();
speech.lang = 'en';

export const speak = (messageObj) => {
  speech.text = messageObj.message;
  speech.voice = window.speechSynthesis.getVoices()[2];
  window.speechSynthesis.speak(speech);
};
