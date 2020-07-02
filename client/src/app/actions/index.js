import axios from 'axios';
import io from 'socket.io-client';

import getUrl from '../../routes';
import {
  sendMessageRequest,
  sendMessageSuccses,
  sendMessageFailure,
  fetchMessagesRequest,
  fetchMessagesSuccses,
  fetchMessagesFailure,
  changeChannel,
} from '../redusers/index';


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
    dispatch(sendMessageFailure(e));
    console.log(e);
  }
};


export const fetchMessagesAction = () => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const socket = io('ws://localhost:5000');

    socket.on('newMessage', (data) => {
      dispatch(fetchMessagesSuccses(data.data));
    });
  } catch (e) {
    dispatch(fetchMessagesFailure(e));
    console.log(e);
  }
};

export { changeChannel };
