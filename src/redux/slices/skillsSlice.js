import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    
];

const skillsSlice = createSlice({
    initialState,
    name: 'skillsSlice',
    reducers: {
      addSkill: (state, action) => {
        state.push(action.payload);
      },
      updateSkill: (state, action) => {
        const { index, updatedSkill } = action.payload;
        state[index] = updatedSkill;
      },
      removeSkill: (state, action) => {
        const index = action.payload;
        state.splice(index, 1);
      },
    },
  });
  
  export const { addSkill, updateSkill, removeSkill } = skillsSlice.actions;
  export default skillsSlice.reducer;