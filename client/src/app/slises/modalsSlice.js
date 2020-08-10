/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const keyMapping = {
  addModal: 'addModalIsShow',
  renameModal: 'renameModalIsShow',
  deleteModal: 'deleteModalIsShow',
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState: {
    addModalIsShow: false,
    renameModalIsShow: false,
    deleteModalIsShow: false,
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
