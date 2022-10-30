import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  initialState: {
    value: []
  },
  name: 'messages',
  reducers: {
    addMessage: (state, action) => {
      state.value.push({ censor: false, ...action.payload });
    },
    updateAllMessages: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { addMessage, updateAllMessages } = messagesSlice.actions;

export const nickname = (state) => state.messages.value;

export default messagesSlice.reducer;
