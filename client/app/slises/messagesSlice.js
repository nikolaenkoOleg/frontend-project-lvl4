/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    loadMessages(state, { payload: { data: { attributes } } }) {
      const newMessage = attributes;
      state.messages.push(newMessage);
    },
  },
  extraReducers: {
    [channelsActions.deleteChannel]: (state, { payload: { data: { id } } }) => {
      state.messages = state.messages.filter((message) => message.channelId !== id);
    },
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
