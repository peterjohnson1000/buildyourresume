import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    
];

const experienceSlice = createSlice({
    initialState,
    name: 'experienceSlice',
    reducers: {
      addExperience: (state, action) => {
        state.push(action.payload);
      },
      updateExperience: (state, action) => {
        const { index, updatedExperience } = action.payload;
        state[index] = updatedExperience;
      },
      removeExperience: (state, action) => {
        const index = action.payload;
        const indexToRemove = index.indexToRemove;
        state.splice(indexToRemove, 1);
      },
    },
  });
  
  export const { addExperience, updateExperience, removeExperience } = experienceSlice.actions;
  export default experienceSlice.reducer;