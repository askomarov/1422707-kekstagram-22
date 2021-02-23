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
}

//  функция получения случайного элемента из массива
const getRandomArrayElement = (elemets) => {
  return elemets[getRandomInteger(0, elemets.length - 1)];
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

export { getRandomInteger, checkStringLength, getRandomArrayElement, isEscEvent };
