import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   value: null,
};

const templateSlice = createSlice({
   name: 'template',
   initialState,
   reducers: {
      setTemplate(state, action) {
         state.value = action.payload;
      },
   },
});

export const { setTemplate } = templateSlice.actions;

export default templateSlice.reducer;
