import {
  changeChannel,
  getChannels,
  fetchChannels,
  deleteChannel,
  loadingMessagesRequest,
  loadingMessagesSuccses,
  loadingMessagesFailure,
} from '../slises';

export { openModal, closeModal } from '../slises';

export const loadMessages = (data) => (dispatch) => {
  dispatch(loadingMessagesRequest());
  try {
    dispatch(loadingMessagesSuccses(data));
  } catch (e) {
    dispatch(loadingMessagesFailure());
    console.log(e);
  }
};

export {
  changeChannel,
  getChannels,
  fetchChannels,
  deleteChannel,
};
