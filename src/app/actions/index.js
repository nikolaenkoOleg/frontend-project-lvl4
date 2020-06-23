import axios from 'axios';

import getUrl from '../../routes';

import {
  addMessageRequest,
  addMessageSuccses,
  addMessageFailure,
  changeChannel,
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

    console.log(response.status);
    dispatch(addMessageSuccses);
  } catch (e) {
    console.log(e);
    dispatch(addMessageFailure);
  }
};

export { changeChannel };
