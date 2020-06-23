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
    const url = getUrl.channelsPath(channelId);
    console.log(url);
    const response = await axios.post(url, message);
    console.log(response.data);
    dispatch(addMessageSuccses);
  } catch (e) {
    // console.log(e);
    // dispatch(addMessageFailure);
  }
};

export { changeChannel };
