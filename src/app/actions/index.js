import { addMessageRequest, addMessageSuccses, addMessageFailure, changeChannel } from '../redusers';


export const sendMessage = (message) => (dispatch) => {
  dispatch(addMessageRequest);
  try {
    console.log('сообщение в экшене', message);
  } catch (e) {
    console.log('ошибка:', e);
  }
};

export { changeChannel };
