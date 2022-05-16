import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nameOfExercise: ''
};

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setExercise: (state, action) => {
      state.nameOfExercise = action.payload;
    }
  },
});

export const { setExercise } = exerciseSlice.actions;

export const selectNameOfExercise = (state) => state.exercise.nameOfExercise;

export default exerciseSlice.reducer;
