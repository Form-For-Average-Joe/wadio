import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nameOfExercise: '',
  isStarted: false,
  feedback: ''
};

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setExercise: (state, action) => {
      state.nameOfExercise = action.payload;
    },
    setIsStarted: (state, action) => {
      state.isStarted = action.payload;
    },
    clearExerciseState: (state) => {
      //performs a shallow reset/copy!!!!
      state = {...initialState};
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    }
  },
});

export const { setExercise, setIsStarted, clearExerciseState, setFeedback } = exerciseSlice.actions;

export const selectNameOfExercise = (state) => state.exercise.nameOfExercise;
export const selectIsStarted = (state) => state.exercise.isStarted;
export const selectFeedback = (state) => state.exercise.feedback;

export default exerciseSlice.reducer;
