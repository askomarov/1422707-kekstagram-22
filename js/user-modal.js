import { isEscEvent } from './util.js'
import { onbuttonSetScaleValue } from './scale-upload-img.js';
import { changeFilterImg } from './change-filter-img.js';
import { sliderImgFilter } from './slider-img-filter.js';
import { resetUploadForm } from './form/form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const defaultImg = 'img/upload-default-image.jpg';

const scaleValueInput = document.querySelector('.scale__control--value');
const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const scaleButtonSmaller = document.querySelector('.scale__control--smaller');

let uploadInput = document.querySelector('#upload-file');
let uploadOverlay = document.querySelector('.img-upload__overlay');
let body = document.body;
let closeCancelButton = document.querySelector('#upload-cancel');

const uploadImg = document.querySelector('.img-upload__preview > img');
let filterControlsInput = document.querySelectorAll('.effects__radio');

const onModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const closeUploadModal = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
  uploadInput.value = '';
  uploadImg.classList = '';
  resetImageSrc();
};

const openUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};

const userModalUpload = () => {
  uploadInput.addEventListener('change', () => {
    openUploadModal();
    sliderImgFilter();
  });

  onbuttonSetScaleValue(scaleButtonBigger, scaleButtonSmaller, scaleValueInput, +25, 100, uploadImg);
  onbuttonSetScaleValue(scaleButtonSmaller, scaleButtonBigger, scaleValueInput, -25, 25, uploadImg);

  changeFilterImg(filterControlsInput, uploadImg);

  closeCancelButton.addEventListener('click', () => {
    closeUploadModal();
    resetUploadForm();
  })
};

const setUploadIMg = () => {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        uploadImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const resetImageSrc = () => {
  uploadImg.src = defaultImg;
};

export { userModalUpload, closeUploadModal, setUploadIMg };
