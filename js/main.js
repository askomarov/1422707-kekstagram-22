'use strict';

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
getRandomInteger(1, 1);

const checkStringLength = function (string, MAX_LENGTH = 140) {
  return string.length <= MAX_LENGTH
}
checkStringLength('artem art')
