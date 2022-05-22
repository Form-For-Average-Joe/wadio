import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.nameOfExercise = action.payload;
    }
  },
});

export const { setIsLoggedIn } = loginSlice.actions;

export const selectIsLoggedIn = (state) => state.login.isLoggedIn;

export default loginSlice.reducer;
