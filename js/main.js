const getRandomInteger = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
getRandomInteger();

const checkStringLength = function (string, MAX_LENGTH = 140) {
  return string.length <= MAX_LENGTH
}
checkStringLength('artem art')
