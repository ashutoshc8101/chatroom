import { createSlice } from '@reduxjs/toolkit';

export const nicknameSlice = createSlice({
  initialState: {
    value: ''
  },
  name: 'nickname',
  reducers: {
    updateNickname: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { updateNickname } = nicknameSlice.actions;

export const nickname = (state) => state.nickname.value;

export default nicknameSlice.reducer;
