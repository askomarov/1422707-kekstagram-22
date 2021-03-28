/* global noUiSlider:readonly */
const CHROME_SEPIA_OPTIONS = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
};

const MARVIN_OPTIONS = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
};

const PHOBOS_OPTIONS = {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const HEAT_OPTIONS = {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
}

const sliderWrapper = document.querySelector('.img-upload__effect-level');
const sliderFilter = document.querySelector('.effect-level__slider');
const uploadImg = document.querySelector('.img-upload__preview > img');
const filterControlsWrapper = document.querySelector('.img-upload__effects');
const effectLevel = document.querySelector('.effect-level__value');

const resetEffectImage = () => {
  effectLevel.value = '';
  uploadImg.style.filter = 'none';
};

const createSlider = (sliderElement) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 50,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const initSlider = (sliderElement) => {
  const sliderBase = document.querySelector('.noUi-base');
  // чтобы не было реинициализации - иначе ошибка, проверям есть ли слайдер?
  if (!sliderBase) {
    createSlider(sliderElement);
  }
  sliderWrapper.classList.add('hidden');
};

const changeFilterImageValue = (sliderElement, img) => {
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    // при отправке формы или сбросе - не забыть сккинуть и значение effect.value
    effectLevel.value = unencoded[handle];
    if (img.classList.contains('effects__preview--chrome')) {
      img.style.filter = `grayscale(${unencoded[handle]})`;
    }
    if (img.classList.contains('effects__preview--sepia')) {
      img.style.filter = `sepia(${unencoded[handle]})`;
    }
    if (img.classList.contains('effects__preview--marvin')) {
      img.style.filter = `invert(${unencoded[handle]}%)`;
    }
    if (img.classList.contains('effects__preview--phobos')) {
      img.style.filter = `blur(${unencoded[handle]}px)`;
    }
    if (img.classList.contains('effects__preview--heat')) {
      img.style.filter = `brightness(${unencoded[handle]})`;
    }
  });
};

const onRadioEffectBtnClick = (evt) => {
  if (evt.target.value === 'none') {
    uploadImg.style.filter = '';
    sliderWrapper.classList.add('hidden');
  }
  if (evt.target.value === 'chrome' || evt.target.value === 'sepia') {
    sliderWrapper.classList.remove('hidden');
    sliderFilter.noUiSlider.updateOptions(CHROME_SEPIA_OPTIONS);
  }
  if (evt.target.value === 'marvin') {
    sliderWrapper.classList.remove('hidden');
    sliderFilter.noUiSlider.updateOptions(MARVIN_OPTIONS);
  }
  if (evt.target.value === 'phobos') {
    sliderWrapper.classList.remove('hidden');
    sliderFilter.noUiSlider.updateOptions(PHOBOS_OPTIONS);
  }
  if (evt.target.value === 'heat') {
    sliderWrapper.classList.remove('hidden');
    sliderFilter.noUiSlider.updateOptions(HEAT_OPTIONS);
  }
};

const changeSliderOption = () => {
  filterControlsWrapper.addEventListener('click', onRadioEffectBtnClick)
};

const removeFilterControlsListener = () => {
  filterControlsWrapper.removeEventListener('click', onRadioEffectBtnClick)
};

const setSliderImgFilter = () => {
  initSlider(sliderFilter);
  changeFilterImageValue(sliderFilter, uploadImg);
  changeSliderOption();
};

export { setSliderImgFilter, resetEffectImage, removeFilterControlsListener };
