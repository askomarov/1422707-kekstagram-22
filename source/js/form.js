import { isEscEvent } from './util.js';
import { sendData } from './get-send-data.js';
import { resetEffectImage } from './slider-img-filter.js';
import { resetScaleImage } from './scale-upload-img.js';
import { closeUploadModal } from './user-modal.js';

const uploadForm = document.querySelector('#upload-select-image');

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const mainContentWrap = document.querySelector('main');

const resetFormsData = () => {
  uploadForm.reset();
  resetEffectImage();
  resetScaleImage();
};

const onErrorPopupCloseKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopupError();
  }
};

const closePopupError = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onErrorPopupCloseKeydown);
  document.removeEventListener('click', onErrorPopupCloseClickAway);
};

const onErrorPopupCloseClickAway = (evt) => {
  if (evt.target.closest('.error__inner') === null) {
    closePopupError();
  }
};

const onErrorPopupCloseClick = (evt) => {
  closePopupError();
  evt.target.removeEventListener('click', onErrorPopupCloseClick);
};

const showErrorPopupMessage = () => {
  const messageElement = errorMessageTemplate.cloneNode(true);
  mainContentWrap.append(messageElement);
  const closeErrPopupBtn = document.querySelector('.error__button');
  closeErrPopupBtn.addEventListener('click', onErrorPopupCloseClick);
  document.addEventListener('keydown', onErrorPopupCloseKeydown);
  document.addEventListener('click', onErrorPopupCloseClickAway);
};

const onFailSubmit = () => {
  closeUploadModal();
  resetFormsData();
  showErrorPopupMessage();
};

//////// показ и скрытие сообщени при усешной отправки формы
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const closeSuccessPopup = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onSuccessPopupCloseKeydown);
  document.removeEventListener('click', onSuccessPopupCloseClickAway);
};

const onSuccessPopupCloseClickAway = (evt) => {
  if (evt.target.closest('.success__inner') === null) {
    closeSuccessPopup();
  }
};

const onSuccessPopupCloseKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

const onSuccessPopupCloseClick = (evt) => {
  closeSuccessPopup();
  evt.target.removeEventListener('click', onSuccessPopupCloseClick);
};

const showSuccessPopupMessage = () => {
  const messageElement = successMessageTemplate.cloneNode(true);
  mainContentWrap.append(messageElement);
  const closeSuccessPopupBtn = document.querySelector('.success__button');
  closeSuccessPopupBtn.addEventListener('click', onSuccessPopupCloseClick);
  document.addEventListener('keydown', onSuccessPopupCloseKeydown);
  document.addEventListener('click', onSuccessPopupCloseClickAway);
};

///////// отправка формы нового объяаления
const onSuccessSubmit = () => {
  closeUploadModal();
  resetFormsData();
  showSuccessPopupMessage();
};

const onSubmitSendData = (sendURL) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(sendURL, new FormData(evt.target), onSuccessSubmit, onFailSubmit)
  });
};

export { onSubmitSendData, showErrorPopupMessage, showSuccessPopupMessage, resetFormsData }
