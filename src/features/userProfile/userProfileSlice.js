import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  minutes: 0,
  seconds: 0,
  nickname: "Joe",
  age: 0,
  weight: 0,
  height: 0,
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserTime: (state, action) => {
      state.minutes = action.payload.minutes;
      state.seconds = action.payload.seconds;
    },
    resetUserTime: (state) => {
      state.minutes = 0;
      state.seconds = 0;
    },
    setNicknameR: (state, action) => {
      state.nickname = action.payload;
    },
    setAgeR: (state, action) => {
      state.age = action.payload;
    },
    setWeightR: (state, action) => {
      state.weight = action.payload;
    },
    setHeightR: (state, action) => {
      state.height = action.payload;
    },
  },
  },
);

export const { setUserTime, resetUserTime, setNicknameR, setAgeR, setWeightR, setHeightR } = userProfileSlice.actions;

export const selectMinutes = (state) => state.userProfile.minutes;
export const selectSeconds = (state) => state.userProfile.seconds;
export const selectNicknameR = (state) => state.userProfile.nickname;
export const selectAgeR = (state) => state.userProfile.age;
export const selectWeightR = (state) => state.userProfile.weight;
export const selectHeightR = (state) => state.userProfile.height;

export default userProfileSlice.reducer;
