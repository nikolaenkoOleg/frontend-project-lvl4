import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    sendMessageRequest(state) {
      return { ...state, sendMessageState: { type: 'request' } };
    },
    sendMessageSuccses(state) {
      return { ...state, sendMessageState: { type: 'succses' } };
    },
    sendMessageFailure(state) {
      return { ...state, sendMessageState: { type: 'error', text: 'Network error' } };
    },
    getMessagesRequest(state) {
      const getMessagesState = { type: 'request' };
      return { ...state, getMessagesState };
    },
    getMessagesSuccses(state, { payload: { data: { attributes } } }) {
      const getMessagesState = { type: 'succses' };

      return {
        ...state,
        messages: [...state.messages, attributes],
        getMessagesState,
      };
    },
    getMessagesFailure(state) {
      return { ...state, getMessagesState: { type: 'error', text: 'Network error' } };
    },
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
