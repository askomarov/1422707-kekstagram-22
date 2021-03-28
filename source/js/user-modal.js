import { isEscEvent, showAlert } from './util.js';
import { onbuttonSetScaleValue } from './scale-upload-img.js';
import { setSliderImgFilter, removeFilterControlsListener } from './slider-img-filter.js';
import { resetFormsData } from './form.js';

const SCALE_STEP_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const SCALE_MIN_VALUE = 25;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const defaultImg = 'img/upload-default-image.jpg';

const scaleValueInput = document.querySelector('.scale__control--value');
const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const scaleButtonSmaller = document.querySelector('.scale__control--smaller');

const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const closeCancelButton = document.querySelector('#upload-cancel');

const uploadImg = document.querySelector('.img-upload__preview > img');
const filterControlInputs = document.querySelectorAll('.effects__radio');
const effectsPreview = document.querySelectorAll('.effects__preview');


const setDefaultImgSrc = () => {
  uploadImg.src = defaultImg;
  effectsPreview.forEach(element => {
    element.style.backgroundImage = `url(${defaultImg})`;
  })
};

const changeFilterImg = (array, img) => {
  array.forEach(element => {
    element.addEventListener('click', () => {
      if (element.checked) {
        img.classList = '';
        img.style.filter = '';
        img.classList.add(`effects__preview--${element.value}`)
      }
    })
  });
};

const onModalClose = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const closeUploadModal = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalClose);
  uploadInput.value = '';
  uploadImg.classList = '';
  setDefaultImgSrc();
  resetFormsData();
  removeFilterControlsListener();
};

const openUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalClose);
};

const onUploadShowModal = () => {
  uploadInput.addEventListener('change', () => {
    renderUploadImg();
    setSliderImgFilter();
  });

  onbuttonSetScaleValue(scaleButtonBigger, scaleButtonSmaller, scaleValueInput, +SCALE_STEP_VALUE, SCALE_MAX_VALUE, uploadImg);
  onbuttonSetScaleValue(scaleButtonSmaller, scaleButtonBigger, scaleValueInput, -SCALE_STEP_VALUE, SCALE_MIN_VALUE, uploadImg);

  changeFilterImg(filterControlInputs, uploadImg);

  closeCancelButton.addEventListener('click', () => {
    closeUploadModal();
  })
};

const renderEffectsPreviewImg = (result) => {
  effectsPreview.forEach(element => {
    element.style.backgroundImage = `url('${result}')`;
  })
};

const renderUploadImg = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      uploadImg.src = reader.result;
      renderEffectsPreviewImg(reader.result);
      openUploadModal();
    });

    reader.readAsDataURL(file);
  } else {
    showAlert('Загрузите изобржание в формате: gif, jpg, jpeg, png');
  }
};

export { onUploadShowModal, closeUploadModal };
