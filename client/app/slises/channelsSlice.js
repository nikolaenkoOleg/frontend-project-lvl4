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
    loadChannels(state, { payload: { data: { attributes } } }) {
      const newChannel = attributes;
      state.channels.push(newChannel);
    },
    pullNewChannel(state, { payload: { data: { attributes } } }) {
      const filteredChannels = state.channels.filter((channel) => channel.id !== attributes.id);
      const newChannel = attributes;
      state.channels = filteredChannels.concat(newChannel);
    },
    deleteChannel(state, { payload: { data: { id } } }) {
      state.channels = state.channels.filter((c) => c.id !== id);
      state.currentChannelId = 1;
    },
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
