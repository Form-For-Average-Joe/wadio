import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false
};

export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.nameOfExercise = action.payload;
    }
  },
});

export const { setIsLoggedIn } = assessmentSlice.actions;

export const selectIsLoggedIn = (state) => state.login.isLoggedIn;

export default assessmentSlice.reducer;
