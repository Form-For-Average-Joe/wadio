import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from '../features/exercise/exerciseSlice';

export const store = configureStore({
  reducer: {
    exercise: exerciseReducer,
  },
});
