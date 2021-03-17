import { isEscEvent } from '../util.js';
import { sendData } from '../get-send-data.js';
import { resetEffectImage } from '../slider-img-filter.js';
import { resetScaleImage } from '../scale-upload-img.js';
import { closeUploadModal } from '../user-modal.js';

const uploadForm = document.querySelector('#upload-select-image');

//////// показ и скрытие сообщени при неусешной отправки формы
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const mainContentWrap = document.querySelector('main');

const resetUploadForm = () => {
  uploadForm.reset();
  resetEffectImage();
  resetScaleImage();
  closeUploadModal();
};
const onEscKeydownCloseError = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopupError();
  }
};

const closePopupError = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onEscKeydownCloseError);
  document.removeEventListener('click', onClickCloseError);
};
const onClickCloseError = (evt) => {
  if (evt.target.closest('.error__inner') === null) {
    closePopupError();
  }
};

const onBtnCloseError = (evt) => {
  closePopupError();
  evt.target.removeEventListener('click', onBtnCloseError);
};

const showErrorPopupMessage = () => {
  const messageElement = errorMessageTemplate.cloneNode(true);
  mainContentWrap.append(messageElement);
  const closeErrPopupBtn = document.querySelector('.error__button');
  closeErrPopupBtn.addEventListener('click', onBtnCloseError);
  document.addEventListener('keydown', onEscKeydownCloseError);
  document.addEventListener('click', onClickCloseError);
};

const onFailSubmit = () => {
  resetUploadForm();
  showErrorPopupMessage();
};

//////// показ и скрытие сообщени при усешной отправки формы
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const closeSuccessPopup = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onEscKeydownCloseSuccess);
  document.removeEventListener('click', onClickCloseSuccess);
};

const onClickCloseSuccess = (evt) => {
  if (evt.target.closest('.success__inner') === null) {
    closeSuccessPopup();
  }
};

const onEscKeydownCloseSuccess = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

const onBtnCloseSuccess = (evt) => {
  closeSuccessPopup();
  evt.target.removeEventListener('click', onBtnCloseSuccess);
};

const showSuccessPopupMessage = () => {
  const messageElement = successMessageTemplate.cloneNode(true);
  mainContentWrap.append(messageElement);
  const closeSuccessPopupBtn = document.querySelector('.success__button');
  closeSuccessPopupBtn.addEventListener('click', onBtnCloseSuccess);
  document.addEventListener('keydown', onEscKeydownCloseSuccess);
  document.addEventListener('click', onClickCloseSuccess);
};

///////// отправка формы нового объяаления
const onSuccessSubmit = () => {
  resetUploadForm();
  showSuccessPopupMessage();
};

const submitForm = (sendURL) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(sendURL, new FormData(evt.target), onSuccessSubmit, onFailSubmit)
  });
};


export { submitForm, showErrorPopupMessage, showSuccessPopupMessage, resetUploadForm }
