import axios from 'axios';

import getUrl from '../../routes';
import {
  changeChannel,
  getChannels,
  fetchChannels,
  deleteChannel,
  sendMessageRequest,
  sendMessageSuccses,
  sendMessageFailure,
  loadingMessagesRequest,
  loadingMessagesSuccses,
  loadingMessagesFailure,
  addNewChannelRequest,
  addNewChannelSuccses,
  addNewChannelFailure,
  renameChannelRequest,
  renameChannelSuccess,
  renameChannelFailure,
  deleteChannelRequest,
  deleteChannelSuccess,
  deleteChannelFailure,
} from '../slises';

export { openModal, closeModal } from '../slises';

export const sendMessageAction = (message) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const { channelId } = message;
    const url = getUrl.channelMessagesPath(channelId);

    await axios.post(url, { data: { attributes: { message } } });
    dispatch(sendMessageSuccses());
  } catch (e) {
    dispatch(sendMessageFailure());
    console.log(e);
  }
};

export const loadMessagesAction = (data) => (dispatch) => {
  dispatch(loadingMessagesRequest());
  try {
    dispatch(loadingMessagesSuccses(data));
  } catch (e) {
    dispatch(loadingMessagesFailure());
    console.log(e);
  }
};

export const addNewChannelAction = (name) => async (dispatch) => {
  dispatch(addNewChannelRequest());
  try {
    const url = getUrl.channelsPath();
    await axios.post(url, { data: { attributes: { name } } });

    dispatch(addNewChannelSuccses());
  } catch (e) {
    dispatch(addNewChannelFailure(e));
    console.log(e);
  }
};

export const renameChannelAction = ({ channelName, currentChannelId }) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const url = getUrl.channelPath(currentChannelId);
    await axios.patch(url, { data: { attributes: { name: channelName } } });

    dispatch(renameChannelSuccess());
  } catch (e) {
    dispatch(renameChannelFailure(e));
    console.log(e);
  }
};

export const deleteChannelAction = (channelId) => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    const url = getUrl.channelPath(channelId);
    await axios.delete(url, { data: { attributes: { id: channelId } } });
    dispatch(deleteChannelSuccess());
  } catch (e) {
    dispatch(deleteChannelFailure(e));
    console.log(e);
  }
};

export {
  changeChannel,
  getChannels,
  fetchChannels,
  deleteChannel,
};
