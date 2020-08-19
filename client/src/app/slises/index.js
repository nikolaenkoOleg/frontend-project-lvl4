import { combineReducers } from 'redux';

import messagesState, { actions as messagesActions } from './messagesSlice';
import channelsState, { actions as channelsActions } from './channelsSlice';
import modalsState, { actions as modalActions } from './modalsSlice';

export const {
  loadingMessagesRequest,
  loadingMessagesSuccses,
  loadingMessagesFailure,
} = messagesActions;

export const {
  changeChannel,
  getChannels,
  fetchChannels,
  deleteChannel,
  deleteChannelRequest,
  deleteChannelSuccess,
  deleteChannelFailure,
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
