import { combineReducers } from 'redux';

import messagesState, { actions as messagesActions } from './messagesSlice';
import channelsState, { actions as channelsActions } from './channelsSlice';
import modalsState, { actions as modalActions } from './modalsSlice';

export const {
  loadMessages,
} = messagesActions;

export const {
  changeChannel,
  loadChannels,
  pullNewChannel,
  deleteChannel,
} = channelsActions;

export const {
  openModal,
  closeModal,
} = modalActions;

export default combineReducers({
  messagesState,
  channelsState,
  modalsState,
});
