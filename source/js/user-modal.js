import { isEscEvent } from './util.js';
import { onbuttonSetScaleValue } from './scale-upload-img.js';
import { setSliderImgFilter } from './slider-img-filter.js';
import { resetUploadForm } from './form.js';

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
const filterControlsInput = document.querySelectorAll('.effects__radio');

const changeFilterImg = (array, img) => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    element.addEventListener('click', () => {
      if (element.checked == true) {
        img.classList = '';
        img.style.filter = '';
        img.classList.add(`effects__preview--${element.value}`)
      }
    })
  }
};

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
    setSliderImgFilter();
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
