import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  reducers: {
    changeActiveChannel(state, action) {
      const { id } = action.payload;
      return { ...state, currentChannelId: id };
    },
    addNewChannel(state, action) {
      const { id, name } = action.payload;
      return state.channels.push({ [id]: name });
    },
  },
});

// const messageSlice = createSlice({
//   name: 'messages',
//   reducers: {
//     postMessage(state, action) {

//     },
//   },
// });

const { actions, reducer } = channelsSlice;
const { changeActiveChannel, addNewChannel } = actions;

export {
  reducer,
  changeActiveChannel,
  addNewChannel,
  actions,
};
