import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nameOfExercise: '',
  isStarted: false,
  feedback: '',
  duration: 60,
  stage: 0,
  count: 0,
  isCanStart: false,
  difficultyLevel: 1,
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
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setStage: (state, action) => {
      state.stage = action.payload;
    },
    incrementCount: (state) => {
      state.count++;
    },
    resetStageAndCount: (state) => {
      state.count = 0;
      state.stage = 0;
    },
    setIsCanStart: (state, action) => {
      state.isCanStart = action.payload;
    },
    setDifficultyLevel: (state, action) => {
      state.difficultyLevel = action.payload;
    },
  },
});

export const { setExercise, setIsStarted, clearExerciseState, setFeedback, setDuration, setStage, incrementCount, resetStageAndCount, setIsCanStart, setDifficultyLevel } = exerciseSlice.actions;

export const selectNameOfExercise = (state) => state.exercise.nameOfExercise;
export const selectIsStarted = (state) => state.exercise.isStarted;
export const selectFeedback = (state) => state.exercise.feedback;
export const selectDuration = (state) => state.exercise.duration;
export const selectCount = (state) => state.exercise.count;
export const selectStage = (state) => state.exercise.stage;
export const selectIsCanStart = (state) => state.exercise.isCanStart;
export const selectDifficultyLevel = (state) => state.exercise.difficultyLevel;

export default exerciseSlice.reducer;
