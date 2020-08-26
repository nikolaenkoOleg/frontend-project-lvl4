/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modal',
  initialState: {},
  reducers: {
    openModal(state, { payload }) {
      state.type = payload;
      state.status = 'opened';
    },
    closeModal(state, { payload }) {
      state.type = payload;
      state.status = 'closed';
    },
  },
});

export const { actions } = modalsSlice;

export default modalsSlice.reducer;
