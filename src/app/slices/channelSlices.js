import { createSlice } from '@reduxjs/toolkit';

const channelsSlise = createSlice({
  name: 'channels',
  reducers: {
    changeActiveChannel(state, action) {
      const { id } = action.payload;
      return { ...state, currentChannel: id };
    },
    addNewChannel(state, action) {
      const { id, name } = action.payload;
      return state.channels.push({ [id]: name });
    },
  },
});

const { actions, reducer } = channelsSlise;
const { changeActiveChannel, addNewChannel } = actions;

export { reducer, changeActiveChannel, addNewChannel };
