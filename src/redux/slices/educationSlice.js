import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    
];

const educationSlice = createSlice({
    initialState,
    name: 'educationSlice',
    reducers: {
      addEducation: (state, action) => {
        state.push(action.payload);
      },
      updateEducation: (state, action) => {
        const { index, updatedEducation } = action.payload;
        state[index] = updatedEducation;
      },
      removeEducation: (state, action) => {
        const index = action.payload;
        state.splice(index, 1);
      },
    },
  });
  
  export const { addEducation, updateEducation, removeEducation } = educationSlice.actions;
  export default educationSlice.reducer;