const uploadImg = document.querySelector('.img-upload__preview > img');

const setImgTransformeStyle = (img, value) => {
  img.style.transform = `scale(${value})`;
};

const getInputValue = (input, newValue, img) => {
  const arrayInValue = input.value.split('%');
  const numInValue = arrayInValue[0];
  let newNum = numInValue;
  let newArrayValue = [];
  newNum = +numInValue + newValue;
  newArrayValue.push(newNum + '%');
  input.value = newArrayValue;
  setImgTransformeStyle(img, newNum / 100);
};

const onbuttonSetScaleValue = (button, button2, input, btnValue, btnOffValue, img) => {
  button.addEventListener('click', () => {
    button2.removeAttribute('disabled', 'disabled');
    if (input.value === Math.abs(btnOffValue) + '%') {
      button.setAttribute('disabled', 'disabled');
    } else {
      button.removeAttribute('disabled', 'disabled');
      getInputValue(input, btnValue, img);
    }
  });
};

const resetScaleImage = () => {
  uploadImg.style.transform = '';
};

export { onbuttonSetScaleValue, resetScaleImage };
