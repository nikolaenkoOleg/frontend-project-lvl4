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
    const url = getUrl.channelPath(channelId);
    const response = await axios.post(url, message);
    dispatch(addMessageSuccses);
  } catch (e) {
    console.log(e);
    dispatch(addMessageFailure);
  }
};

export { changeChannel };
