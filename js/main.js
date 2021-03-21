
import { createPicturesElemts } from './create-pictures-elemtns.js';
import { userModalUpload } from './user-modal.js';
import { onInputTagValidateListener, onCommentInputListener } from './form/tags-comment-validate.js';
import { getData } from './get-send-data.js';
import { showAlert } from './util.js';
import { submitForm } from './form/form.js';
// import { showImgFilter, btnDefaultListener, btnRandomListener, btnDiscussedListener } from './img-filter.js';

import { showImgFilter, renderFilteredImages } from './img-filter.js';

const getUrl = 'https://22.javascript.pages.academy/kekstagram/data';
const sendUrl = 'https://22.javascript.pages.academy/kekstagram';
// const sendUrl = 'https://22.javascript.pages.academy/kekstagra=m';

// Закончил 7. Асинхронность. Работа с сетью, ДЗ выполнил
const getDataSuccess = (data) => {
  showImgFilter();
  createPicturesElemts(data);
  renderFilteredImages(data);
};

document.addEventListener('DOMContentLoaded', () => {
  getData(getUrl, getDataSuccess, showAlert)

  userModalUpload();
  onInputTagValidateListener();
  onCommentInputListener();

  submitForm(sendUrl)

});
