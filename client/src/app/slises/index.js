import { combineReducers } from 'redux';

import messagesState, { actions as messagesActions } from './messagesSlice';
import channelsState, { actions as channelsActions } from './channelsSlice';
import modalsState, { actions as modalActions } from './modalSlice';

export const {
  sendMessageRequest,
  sendMessageSuccses,
  sendMessageFailure,
  getMessagesRequest,
  getMessagesSuccses,
  getMessagesFailure,
} = messagesActions;

export const {
  changeChannel,
  getChannels,
  fetchChannels,
  addNewChannelRequest,
  addNewChannelSuccses,
  addNewChannelFailure,
  editChannelRequest,
  editChannelSuccess,
  editChannelFailure,
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
