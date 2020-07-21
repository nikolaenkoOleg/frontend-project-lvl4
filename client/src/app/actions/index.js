import axios from 'axios';

import getUrl from '../../routes';
import {
  sendMessageRequest,
  sendMessageSuccses,
  sendMessageFailure,
  getMessagesRequest,
  getMessagesSuccses,
  getMessagesFailure,
  addNewChannelRequest,
  addNewChannelSuccses,
  addNewChannelFailure,
  changeChannel,
  getChannels,
} from '../slises';

export { openModal, closeModal } from '../slises';

export const sendMessageAction = (message) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const { channelId } = message;
    const url = getUrl.channelMessagesPath(channelId);

    await axios.post(url, {
      data: {
        attributes: {
          message,
        },
      },
    });
    dispatch(sendMessageSuccses());
  } catch (e) {
    dispatch(sendMessageFailure());
    console.log(e);
  }
};


export const getMessagesAction = (data) => (dispatch) => {
  dispatch(getMessagesRequest());
  try {
    dispatch(getMessagesSuccses(data));
  } catch (e) {
    dispatch(getMessagesFailure());
    console.log(e);
  }
};

export const addNewChannelAction = (name) => async (dispatch) => {
  dispatch(addNewChannelRequest());
  try {
    const url = getUrl.channelsPath();
    await axios.post(url, {
      data: {
        attributes: {
          name,
        },
      },
    });

    dispatch(addNewChannelSuccses());
  } catch (e) {
    dispatch(addNewChannelFailure(e));
    console.log(e);
  }
};

export { changeChannel, getChannels };
