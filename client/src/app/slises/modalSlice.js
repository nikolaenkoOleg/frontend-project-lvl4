import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isShow: false,
  },
  reducers: {
    openModal(state) {
      console.log(state);
      return { ...state, isShow: true };
    },
    closeModal(state) {
      return { ...state, isShow: false };
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
