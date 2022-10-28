import { createSlice } from '@reduxjs/toolkit';

export const inputMessageSlice = createSlice({
  name: 'inputMessage',
  initialState: {
    value: ''
  },
  reducers: {
    updateInputMessage: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { updateInputMessage } = inputMessageSlice.actions;

export const inputMessage = (state) => state.messages.value;

export default inputMessageSlice.reducer;
