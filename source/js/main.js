// надо делать лайки и счетчик +/- лайк
import { createPicturesElemts } from './create-pictures-elemtns.js';
import { onUploadShowModal, renderUploadImg } from './user-modal.js';
import { onInputTagValidateListener, onInputCommentValidateListener } from './tags-comment-validate.js';
import { getData } from './get-send-data.js';
import { showAlert } from './util.js';
import { onSubmitSendData } from './form.js';

import { showImgFilter, renderFilteredImages } from './img-filter.js';

const getUrl = 'https://22.javascript.pages.academy/kekstagram/data';
const sendUrl = 'https://22.javascript.pages.academy/kekstagram';

const getDataSuccess = (data) => {
  createPicturesElemts(data);
  showImgFilter();
  renderFilteredImages(data);
};

document.addEventListener('DOMContentLoaded', () => {
  getData(getUrl, getDataSuccess, showAlert);
  renderUploadImg();
  onUploadShowModal();
  onInputTagValidateListener();
  onInputCommentValidateListener();
  onSubmitSendData(sendUrl);
});
