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
      return { ...state, currentChannelId: id };
    },
    addNewChannelRequest(state) {
      return { ...state, addingChannelState: 'request' };
    },
    addNewChannelSuccses(state) {
      return { ...state, addingChannelState: 'success' };
    },
    addNewChannelFailure(state) {
      return { ...state, addingChannelState: 'error' };
    },
    getChannels(state, { payload: { data: { attributes } } }) {
      const { channels } = state;
      return {
        ...state,
        channels: [...channels, attributes],
        getChannelsState: 'success',
      };
    },
    renameChannelRequest(state) {
      return { ...state, renameChannelState: 'request' };
    },
    renameChannelSuccess(state) {
      return { ...state, renameChannelState: 'success' };
    },
    renameChannelFailure(state) {
      return { ...state, renameChannelState: 'failure' };
    },
    fetchChannels(state, { payload: { data: { attributes } } }) {
      const { channels } = state;
      const filteredChannels = channels.filter((channel) => channel.id !== attributes.id);
      return {
        ...state,
        channels: [...filteredChannels, attributes],
        editChannelState: 'success',
      };
    },
    deleteChannelRequest(state) {
      return { ...state, deleteChannelState: 'request' };
    },
    deleteChannelSuccess(state) {
      return { ...state, deleteChannelState: 'success' };
    },
    deleteChannelFailure(state) {
      return { ...state, deleteChannelState: 'failure' };
    },
    deleteChannel(state, { payload: { data: { id } } }) {
      state.channels = state.channels.filter((c) => c.id !== id);
    },
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
