// надо делать лайки и счетчик +/- лайк
import { createPicturesElemts } from './create-pictures-elemtns.js';
import { onUploadShowModal } from './user-modal.js';
import { onInputTagValidateListener, onInputCommentValidateListener } from './tags-comment-validate.js';
import { getData } from './get-send-data.js';
import { showAlert } from './util.js';
import { onSubmitSendData } from './form.js';

import { showImgFilter, sortingImages } from './img-filter.js';

const GET_URL = 'https://22.javascript.pages.academy/kekstagram/data';
const SEND_URL = 'https://22.javascript.pages.academy/kekstagram';

const getDataSuccess = (data) => {
  createPicturesElemts(data);
  showImgFilter();
  sortingImages(data);
};

document.addEventListener('DOMContentLoaded', () => {
  getData(GET_URL, getDataSuccess, showAlert);
  onUploadShowModal();
  onInputTagValidateListener();
  onInputCommentValidateListener();
  onSubmitSendData(SEND_URL);
});
