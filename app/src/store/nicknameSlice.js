import { createSlice } from '@reduxjs/toolkit';

export const nicknameSlice = createSlice({
  name: 'nickname',
  initialState: {
    value: ''
  },
  reducers: {
    updateNickname: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { updateNickname } = nicknameSlice.actions;

export const nickname = (state) => state.nickname.value;

export default nicknameSlice.reducer;
