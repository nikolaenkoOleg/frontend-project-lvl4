import axios from 'axios';

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


// export const fetchMessagesAction = (channelId) => async (dispatch) => {
//   dispatch(getMessagesRequest);
//   try {
//   } catch (e) {
//     console.log(e);
//     dispatch(addMessageFailure);
//   }
// };

export { changeChannel };
