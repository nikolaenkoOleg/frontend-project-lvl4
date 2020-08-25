/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const keyMapping = {
  addingModal: 'addingModalIsShown',
  renamingModal: 'renamingModalIsShown',
  deletingModal: 'deletingModalIsShown',
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState: {
    addingModalIsShow: false,
    renamingModalIsShow: false,
    deletingModalIsShow: false,
  },
  reducers: {
    openModal(state, { payload }) {
      const key = keyMapping[payload];
      state[key] = true;
    },
    closeModal(state, { payload }) {
      const key = keyMapping[payload];
      state[key] = false;
    },
  },
});

export const { actions } = modalsSlice;

export default modalsSlice.reducer;
