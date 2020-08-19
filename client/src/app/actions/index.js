import axios from 'axios';

import getUrl from '../../routes';
import {
  changeChannel,
  getChannels,
  fetchChannels,
  deleteChannel,
  loadingMessagesRequest,
  loadingMessagesSuccses,
  loadingMessagesFailure,
  deleteChannelRequest,
  deleteChannelSuccess,
  deleteChannelFailure,
} from '../slises';

export { openModal, closeModal } from '../slises';

export const loadMessagesAction = (data) => (dispatch) => {
  dispatch(loadingMessagesRequest());
  try {
    dispatch(loadingMessagesSuccses(data));
  } catch (e) {
    dispatch(loadingMessagesFailure());
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
