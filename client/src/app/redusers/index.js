import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  reducers: {
    changeChannel(state, action) {
      const { id } = action.payload;
      return { ...state, currentChannelId: id };
    },
    addMessageRequest(state) {
      return state;
    },
    addMessageSuccses() {
      return 'success';
    },
    addMessageFailure() {
      return 'failure';
    },
    fetchMessagesRequest(state) {
      return state;
    },
    fetchMessagesSucces(state, { payload: { attributes } }) {
      state.messages.push({ ...attributes });
      return state;
    },
    fetchMessagesFailure() {
      return 'failure';
    },
  },
});

const { actions, reducer } = chatSlice;

export const {
  addMessageRequest,
  addMessageSuccses,
  addMessageFailure,
  fetchMessagesRequest,
  fetchMessagesSucces,
  fetchMessagesFailure,
  changeChannel,
} = actions;

export default reducer;
