// надо делать лайки и счетчик +/- лайк
import { createPicturesElemts } from './create-pictures-elemtns.js';
import { userModalUpload, setUploadIMg } from './user-modal.js';
import { onInputTagValidateListener, onCommentInputListener } from './tags-comment-validate.js';
import { getData } from './get-send-data.js';
import { showAlert } from './util.js';
import { submitForm } from './form.js';

import { showImgFilter, renderFilteredImages } from './img-filter.js';

const getUrl = 'https://22.javascript.pages.academy/kekstagram/data';
const sendUrl = 'https://22.javascript.pages.academy/kekstagram';

// Закончил 8.  Фото на память (необязательное задание)
const getDataSuccess = (data) => {
  showImgFilter();
  createPicturesElemts(data);
  renderFilteredImages(data);
};

document.addEventListener('DOMContentLoaded', () => {
  getData(getUrl, getDataSuccess, showAlert);
  setUploadIMg();
  userModalUpload();
  onInputTagValidateListener();
  onCommentInputListener();
  submitForm(sendUrl);
});
