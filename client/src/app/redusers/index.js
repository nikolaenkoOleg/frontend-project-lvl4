import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  reducers: {
    changeChannel(state, action) {
      const { id } = action.payload;
      return { ...state, currentChannelId: id };
    },
    sendMessageRequest(state) {
      return { ...state, sendMessagesState: { type: 'request' } };
    },
    sendMessageSuccses(state) {
      return { ...state, sendMessagesState: { type: 'succses' } };
    },
    sendMessageFailure(state, { payload: { message } }) {
      return { ...state, sendMessagesState: { type: 'error', text: message } };
    },
    getMessagesRequest(state) {
      const fetchMessagesState = { type: 'request', text: 'request' };
      return { ...state, fetchMessagesState };
    },
    getMessagesSuccses(state, { payload: { data: { attributes } } }) {
      const fetchMessagesState = { type: 'succses', text: 'Succses!' };

      return {
        ...state,
        messages: [...state.messages, attributes],
        fetchMessagesState,
      };
    },
    getMessagesFailure(state, { payload: { message } }) {
      const fetchMessagesState = { type: 'error', text: message };
      return { ...state, fetchMessagesState };
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
