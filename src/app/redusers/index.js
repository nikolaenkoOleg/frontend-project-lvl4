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
      return 'succses';
    },
    addMessageFailure() {
      return 'failure';
    },
  },
});

console.log('слайс', chatSlice);

const { actions, reducer } = chatSlice;

export const {
  addMessageRequest,
  addMessageSuccses,
  addMessageFailure,
  changeChannel,
} = actions;

export default reducer;
