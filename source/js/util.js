const TIME_CLOSE_ALERT = 2000;

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return false;
  }
  if (max < min) {
    return Math.round(Math.random() * (min - max)) + max;
  }
  if (min === max) {
    return min;
  }
  return Math.round(Math.random() * (max - min)) + min;
};

const getRandomUniqElemets = (data, RANDOM_COUNT) => {
  const randomUniqData = [];
  while (randomUniqData.length < RANDOM_COUNT) {
    const element = data[getRandomInteger(0, data.length - 1)];
    if (!randomUniqData.includes(element)) {
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
  }, TIME_CLOSE_ALERT);
};

export { getRandomInteger, getRandomUniqElemets, isEscEvent, showAlert };
