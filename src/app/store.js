import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from '../features/exercise/exerciseSlice';
import userProfileReducer from "../features/userProfile/userProfileSlice";

export const store = configureStore({
  reducer: {
    exercise: exerciseReducer,
    userProfile: userProfileReducer
  },
});
