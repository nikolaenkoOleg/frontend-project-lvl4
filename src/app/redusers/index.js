import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  reducers: {
    changeChannel(state, action) {
      const { id } = action.payload;
      return { ...state, currentChannelId: id };
    },
    addMessageRequest() {
      return 'request';
    },
    addMessageSuccses() {
      return 'success';
    },
    addMessageFailure() {
      return 'failure';
    },
    getMessagesRequest() {
      return 'request';
    },
    getMessagesSucces(state, action) {
      return 'succes';
    },
    getMessagesFailure() {
      return 'failure';
    },
  },
});

const { actions, reducer } = chatSlice;

export const {
  addMessageRequest,
  addMessageSuccses,
  addMessageFailure,
  getMessagesRequest,
  getMessagesSucces,
  getMessagesFailure,
  changeChannel,
} = actions;

export default reducer;
