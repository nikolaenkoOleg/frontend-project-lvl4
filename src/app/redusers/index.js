import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import getUrl from '../../routes';

const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message) => {
    const url = getUrl.channelMessagesPath();
    const response = axios.post(url, message);
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'chat',
  reducers: {
    changeChannel(state, action) {
      const { id } = action.payload;
      return { ...state, currentChannelId: id };
    },
  },
  extraReducers: {
    [sendMessage.fulfilled]: (state, action) => {
      console.log(action.payload);
      return state;
    },
  },
}, {});

console.log(channelsSlice);

const { actions, reducer } = channelsSlice;

export { actions, reducer };
