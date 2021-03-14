/* global noUiSlider:readonly */
const sliderFilter = document.querySelector('.effect-level__slider');

const uploadImg = document.querySelector('.img-upload__preview > img');
const filterControlsInput = document.querySelectorAll('.effects__radio');

const initSlider = (sliderElement) => {
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
  sliderElement.classList.add('hidden')
};
const changeFilterImageValue = (sliderElement, img) => {
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
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
}

const changeSliderOption = (sliderElement, array, img) => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    element.addEventListener('click', (evt) => {
      if (evt.target.value == 'none') {
        img.style.filter = '';
        sliderElement.classList.add('hidden')
      }

      if (evt.target.value == 'chrome' || evt.target.value == 'sepia') {
        sliderElement.classList.remove('hidden')
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
      }
      if (evt.target.value == 'marvin') {
        sliderElement.classList.remove('hidden')
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        });
      }
      if (evt.target.value == 'phobos' || evt.target.value == 'heat') {
        sliderElement.classList.remove('hidden')
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
      }
      if (evt.target.value == 'heat') {
        sliderElement.classList.remove('hidden')
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
      }
    })
  }
};


const sliderImgFilter = () => {
  initSlider(sliderFilter);
  changeFilterImageValue(sliderFilter, uploadImg)
  changeSliderOption(sliderFilter, filterControlsInput, uploadImg)
}

export { sliderImgFilter };
