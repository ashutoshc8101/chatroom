import { configureStore } from '@reduxjs/toolkit';

import inputMessageReducer from './inputMessageSlice';
import messagesReducer from './messagesSlice';
import nicknameReducer from './nicknameSlice';
import textToSpeechIsEnabledReducer from './textToSpeechIsEnabledSlice';

export default configureStore({
  reducer: {
    inputMessageReducer,
    messagesReducer,
    nicknameReducer,
    textToSpeechIsEnabledReducer
  }
});
