import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  duration: 60,
  stage: 0,
  count: 0
};

export const userValuesSlice = createSlice({
  name: 'userValues',
  initialState,
  reducers: {
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
    }
  },
});

export const { setDuration, setStage, incrementCount, resetStageAndCount } = userValuesSlice.actions;

export const selectDuration = (state) => state.userValues.duration;
export const selectCount = (state) => state.userValues.count;
export const selectStage = (state) => state.userValues.stage;

export default userValuesSlice.reducer;
