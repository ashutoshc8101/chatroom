import { createSlice } from '@reduxjs/toolkit';

export const textToSpeechIsEnabledSlice = createSlice({
  initialState: {
    value: false
  },
  name: 'textToSpeechIsEnabled',
  reducers: {
    toggleTextToSpeechIsEnabled: (state) => {
      state.value = !state.value;
    }
  }
});

export const { toggleTextToSpeechIsEnabled } = textToSpeechIsEnabledSlice.actions;

export const textToSpeechIsEnabled = (state) => state.nickname.value;

export default textToSpeechIsEnabledSlice.reducer;
