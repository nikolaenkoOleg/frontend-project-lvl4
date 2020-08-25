/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
  },
  extraReducers: {
    [channelsActions.deleteChannel]: (state, { payload: id }) => {
      state.messages = state.messages.filter((message) => message.channelId !== id);
    },
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
