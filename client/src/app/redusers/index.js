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
    fetchMessagesRequest(state) {
      const fetchMessagesState = { type: 'request', text: 'Listening...' };
      return { ...state, fetchMessagesState };
    },
    fetchMessagesSuccses(state, { payload: { attributes } }) {
      const { channels, messages, currentChannelId } = state;
      const fetchMessagesState = { type: 'succses', text: 'Succses!' };

      return {
        channels,
        messages: [...messages, attributes],
        currentChannelId,
        fetchMessagesState,
      };
    },
    fetchMessagesFailure(state, { payload: { message } }) {
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
  fetchMessagesRequest,
  fetchMessagesSuccses,
  fetchMessagesFailure,
  changeChannel,
} = actions;

export default reducer;
