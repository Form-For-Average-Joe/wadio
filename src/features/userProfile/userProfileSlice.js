import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  //todo temporarily added the minutes and seconds thing here
  minutes: 0,
  seconds: 0
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.nameOfExercise = action.payload;
    },
    setUserTime: (state, action) => {
      state.minutes = action.payload.minutes;
      state.seconds = action.payload.seconds;
    },
    resetUserTime: (state) => {
      state.minutes = 0;
      state.seconds = 0;
    }
  },
});

export const { setIsLoggedIn, setUserTime, resetUserTime } = userProfileSlice.actions;

export const selectIsLoggedIn = (state) => state.userProfile.isLoggedIn;
export const selectMinutes = (state) => state.userProfile.minutes;
export const selectSeconds = (state) => state.userProfile.seconds;

export default userProfileSlice.reducer;
