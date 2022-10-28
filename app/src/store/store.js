import { configureStore } from '@reduxjs/toolkit';

import inputMessageReducer from './inputMessageSlice';
import messagesReducer from './messagesSlice';
import nicknameReducer from './nicknameSlice';

export default configureStore({
  reducer: {
    inputMessageReducer,
    messagesReducer,
    nicknameReducer,
  },
});
