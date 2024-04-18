import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    
];

const extraSlice = createSlice({
    initialState,
    name: 'extraSlice',
    reducers: {
      addData: (state, action) => {
        state.push(action.payload);
      },
      updateData: (state, action) => {
        const { index, updatedData } = action.payload;
        state[index] = updatedData;
      },
      removeData: (state, action) => {
        const index = action.payload;
        const indexToRemove = index.indexToRemove;
        state.splice(indexToRemove, 1);
      },
    },
  });
  
  export const { addData, updateData, removeData } = extraSlice.actions;
  export default extraSlice.reducer;