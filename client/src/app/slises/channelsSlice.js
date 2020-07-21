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
      const getChannelsState = { type: 'success' };
      const { channels } = state;
      return {
        ...state,
        channels: [...channels, attributes],
        getChannelsState,
      };
    },
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
