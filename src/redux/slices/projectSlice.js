import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    
];

const projectSlice = createSlice({
    initialState,
    name: 'projectSlice',
    reducers: {
      addProject: (state, action) => {
        state.push(action.payload);
      },
      updateProject: (state, action) => {
        const { index, updatedProject } = action.payload;
        state[index] = updatedProject;
      },
      removeProject: (state, action) => {
        const index = action.payload;
        state.splice(index, 1);
      },
    },
  });
  
  export const { addProject, updateProject, removeProject } = projectSlice.actions;
  export default projectSlice.reducer;