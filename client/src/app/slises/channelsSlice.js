/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: 1,
    addingChannelState: 'none',
  },
  reducers: {
    changeChannel(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
    getChannels(state, { payload: { data: { attributes } } }) {
      const newChannel = attributes;
      state.channels.push(newChannel);
    },
    fetchChannels(state, { payload: { data: { attributes } } }) {
      const filteredChannels = state.channels.filter((channel) => channel.id !== attributes.id);
      const newChannel = attributes;
      state.channels = filteredChannels.concat(newChannel);
    },
    deleteChannel(state, { payload: { data: { id } } }) {
      state.channels = state.channels.filter((c) => c.id !== id);
    },
    addNewChannelRequest(state) {
      state.addingChannelState = 'request';
    },
    addNewChannelSuccses(state) {
      state.addingChannelState = 'success';
    },
    addNewChannelFailure(state) {
      state.addingChannelState = 'error';
    },
    renameChannelRequest(state) {
      state.renameChannelState = 'request';
    },
    renameChannelSuccess(state) {
      state.renameChannelState = 'success';
    },
    renameChannelFailure(state) {
      state.renameChannelState = 'failure';
    },
    deleteChannelRequest(state) {
      state.deleteChannelState = 'request';
    },
    deleteChannelSuccess(state) {
      state.deleteChannelState = 'success';
    },
    deleteChannelFailure(state) {
      state.deleteChannelState = 'failure';
    },
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
