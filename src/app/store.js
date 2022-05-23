import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from '../features/exercise/exerciseSlice';
import userValuesReducer from '../features/userValues/userValuesSlice';

export const store = configureStore({
  reducer: {
    exercise: exerciseReducer,
    userValues: userValuesReducer
  },
});
