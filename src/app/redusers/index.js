import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import axios from 'axios';

import getUrl from '../../routes';
// import { changeChannel } from '../actions/index';

const addNewChannel = createAsyncThunk(
  'channels/addNewChannel',
  async (channel) => {
    const url = getUrl.channelsPath();
    const response = axios.post(url, channel);
    return response.data;
  },
);

const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (message) => {
    const url = getUrl.channelMessagesPath();
    const response = axios.post(url, message);
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {},
  reducers: {
    changeChannel(state, action) {
      const { id } = action.payload;
      return { ...state, currentChannelId: id };
    },
  },
  extraReducers: {
    [addNewChannel.fulfilled](state, action) {
      console.log(action.payload);
      return {};
    },
  },
}, {});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {},
  extraReducers: {
    [sendMessage.fulfilled](state, action) {
      console.log(action.payload);
      return {};
    },
  },
}, {});

const { actions: channelActions, reducer: channelReducer } = channelsSlice;
const { actions: messageActions, reducer: messagesReduser } = messagesSlice;


export {
  channelActions,
  messageActions,
};

export const reducer = combineReducers({
  channelReducer,
  messagesReduser,
});

// const channels = createReducer({
//   [changeChannel]: (state, action) => {
//     const { id } = action.payload;
//     return { ...state, currentChannelId: id };
//   },
// });

// export default channels;
