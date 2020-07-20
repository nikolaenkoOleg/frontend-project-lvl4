import { combineReducers } from 'redux';

import messagesState, { actions as messagesActions } from './messagesSlice';
import channelsState, { actions as channelsActions } from './channelsSlice';

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
  addNewChannelRequest,
  addNewChannelSuccses,
  addNewChannelFailure,
} = channelsActions;

export default combineReducers({
  messagesState,
  channelsState,
});
