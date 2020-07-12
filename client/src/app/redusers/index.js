import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  reducers: {
    changeChannel(state, { payload: { id } }) {
      return { ...state, currentChannelId: id };
    },
    sendMessageRequest(state) {
      return { ...state, sendMessagesState: { type: 'request' } };
    },
    sendMessageSuccses(state) {
      return { ...state, sendMessagesState: { type: 'succses' } };
    },
    sendMessageFailure(state) {
      return { ...state, sendMessagesState: { type: 'error', text: 'Network error' } };
    },
    getMessagesRequest(state) {
      const getMessagesState = { type: 'request', text: 'request' };
      return { ...state, getMessagesState };
    },
    getMessagesSuccses(state, { payload: { data: { attributes } } }) {
      const getMessagesState = { type: 'succses', text: 'Succses!' };

      return {
        ...state,
        messages: [...state.messages, attributes],
        getMessagesState,
      };
    },
    getMessagesFailure(state) {
      return { ...state, getMessagesState: { type: 'error', text: 'Network error' } };
    },
    addNewChannelRequest(state) {

    },
    addNewChannelSuccses(state) {

    },
    addNewChannelFailure(state) {

    },
  },
});

const { actions, reducer } = chatSlice;

export const {
  sendMessageRequest,
  sendMessageSuccses,
  sendMessageFailure,
  getMessagesRequest,
  getMessagesSuccses,
  getMessagesFailure,
  changeChannel,
} = actions;

export default reducer;
