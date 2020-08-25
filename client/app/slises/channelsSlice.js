/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    changeChannel(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    renameChannel(state, { payload }) {
      const filteredChannels = state.channels.filter((channel) => channel.id !== payload.id);
      const newChannel = payload;
      state.channels = filteredChannels.concat(newChannel);
    },
    deleteChannel(state, { payload: id }) {
      const defaultChannelId = 1;
      state.channels = state.channels.filter((c) => c.id !== id);
      state.currentChannelId = defaultChannelId;
    },
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
