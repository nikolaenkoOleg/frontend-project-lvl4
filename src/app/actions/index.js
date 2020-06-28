import axios from 'axios';
import io from 'socket.io-client';

import getUrl from '../../routes';
import {
  addMessageRequest,
  addMessageSuccses,
  addMessageFailure,
  getMessagesRequest,
  getMessagesSucces,
  getMessagesFailure,
  changeChannel,
  setWebSoketByChannel,
} from '../redusers';


export const sendMessageAction = (message) => async (dispatch) => {
  dispatch(addMessageRequest);
  try {
    const { channelId } = message;
    const url = getUrl.channelMessagesPath(channelId);

    const response = await axios.post(url, {
      data: {
        attributes: {
          message,
        },
      },
    });
    dispatch(addMessageSuccses);
  } catch (e) {
    console.log(e);
    dispatch(addMessageFailure);
  }
};


export const setWebSoketAction = ({ id }) => async () => {
  const url = getUrl.channelMessagesPath(id);
  const socket = io(`ws://localhost:5000${url}`);

  socket.on('newMessage', (data) => {
    console.log(data);
  });
};

export { changeChannel };
