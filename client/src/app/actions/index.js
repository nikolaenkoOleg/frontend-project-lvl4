import axios from 'axios';
import io from 'socket.io-client';

import getUrl from '../../routes';
import {
  addMessageRequest,
  addMessageSuccses,
  addMessageFailure,
  fetchMessagesRequest,
  fetchMessagesSucces,
  fetchMessagesFailure,
  changeChannel,
} from '../redusers/index';


export const sendMessageAction = (message) => async (dispatch) => {
  dispatch(addMessageRequest());
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
    dispatch(addMessageSuccses());
  } catch (e) {
    console.log(e);
    dispatch(addMessageFailure());
  }
};


export const fetchMessagesAction = () => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const socket = io('ws://localhost:5000');

    socket.on('newMessage', (data) => {
      dispatch(fetchMessagesSucces(data.data));
    });
  } catch (error) {
    console.log(error);
    dispatch(fetchMessagesFailure());
  }
};

export { changeChannel };
