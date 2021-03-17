import { createPicturesElemts } from './create-pictures-elemtns.js';
import { userModalUpload } from './user-modal.js';
import { onInputTagValidateListener, onCommentInputListener } from './form/tags-comment-validate.js';
import { getData } from './get-send-data.js';
import { showAlert } from './util.js';
import { submitForm } from './form/form.js';

const getUrl = 'https://22.javascript.pages.academy/kekstagram/data';
const sendUrl = 'https://22.javascript.pages.academy/kekstagram';
// const sendUrl = 'https://22.javascript.pages.academy/kekstagra=m';

// получил данные выввел их отрисовал на этом пока закончил


document.addEventListener('DOMContentLoaded', () => {
  getData(getUrl, createPicturesElemts, showAlert)

  userModalUpload();
  onInputTagValidateListener();
  onCommentInputListener();

  submitForm(sendUrl)

});
