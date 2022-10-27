import { configureStore } from '@reduxjs/toolkit';

import messagesReducer from './messagesSlice';
import nicknameReducer from './nicknameSlice';

export default configureStore({
  reducer: {
    messagesReducer,
    nicknameReducer,
  },
});
