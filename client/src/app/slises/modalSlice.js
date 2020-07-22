import { createSlice } from '@reduxjs/toolkit';

const keyMapping = {
  add: 'addModalState',
  edit: 'editModalState',
  delete: 'deleteModalState',
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState: {
    isShow: false,
  },
  reducers: {
    openModal(state, { payload }) {
      const key = keyMapping[payload];
      return { ...state, [key]: true };
    },
    closeModal(state, { payload }) {
      const key = keyMapping[payload];
      return { ...state, [key]: false };
    },
  },
});

export const { actions } = modalsSlice;

export default modalsSlice.reducer;
