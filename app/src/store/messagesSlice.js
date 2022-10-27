import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    value: []
  },
  reducers: {
    addMessage: (state, action) => {
      state.value.push(action.payload);
    }
  }
})

export const { addMessage } = messagesSlice.actions;

export const nickname = (state) => state.messages.value;

export default messagesSlice.reducer;
