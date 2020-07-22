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
    editChannelRequest(state) {
      return { ...state, editChannelState: 'request' };
    },
    editChannelSucces(state) {
      return { ...state, editChannelState: 'success' };
    },
    editChannelFailure(state, { payload }) {
      console.log(payload);
      return { ...state, editChannelState: 'failure' };
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
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
