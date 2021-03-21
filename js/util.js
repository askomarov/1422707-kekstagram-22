const getRandomInteger = function (min, max) {
  if (min < 0 || max < 0) {
    return alert('диапазон может быть только положительный, включая ноль.')
  } else if (max < min) {
    return Math.round(Math.random() * (min - max)) + max;
  } else if (min === max) {
    return min;
  }
  return Math.round(Math.random() * (max - min)) + min;
};

const checkStringLength = function (string, MAX_LENGTH = 140) {
  return string.length <= MAX_LENGTH
};

//  функция получения случайного элемента из массива
const getRandomArrayElement = (elemets) => {
  return elemets[getRandomInteger(0, elemets.length - 1)];
};

const getRandomUniqElemets = (data, RANDOM_COUNT) => {
  const randomUniqData = [];
  while (randomUniqData.length < RANDOM_COUNT) {
    const element = data[getRandomInteger(0, data.length)];
    if (!randomUniqData.includes(element) && element !== undefined) {
      randomUniqData.push(element);
    }
  }
  return randomUniqData;
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '50%';
  alertContainer.style.top = '50%';
  alertContainer.style.width = '320px';
  alertContainer.style.height = 'auto';
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export { getRandomInteger, checkStringLength, getRandomArrayElement, getRandomUniqElemets, isEscEvent, showAlert };
