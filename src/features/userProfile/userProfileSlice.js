import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  minutes: 0,
  seconds: 0,
  nickname: "Enter New Name",
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
  },
  },
);

export const { setUserTime, resetUserTime } = userProfileSlice.actions;

export const selectMinutes = (state) => state.userProfile.minutes;
export const selectSeconds = (state) => state.userProfile.seconds;

export default userProfileSlice.reducer;
