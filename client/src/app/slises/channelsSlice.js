import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    changeChannel(state, { payload: { id } }) {
      return { ...state, currentChannelId: id };
    },
    addNewChannelRequest(state) {
      return { ...state };
    },
    addNewChannelSuccses(state) {
      return { ...state };
    },
    addNewChannelFailure(state) {
      return { ...state };
    },
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
