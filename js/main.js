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

////////////////////////////////////////////////////////////////////////////////
// значение кол-ва генерированных объектов
const SIMILAR_OBJECT_COUNT = 25;

const FOTO_DESC = [
  'здесь должно быть описание', 'прекрасная фотография чего-то', 'это произведение искусства!', 'однажды в родном городе', 'это было в нашем путешествии',
]

const COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTS_NAME = [
  'Артем', 'Сергей', 'Максим', 'Виталий', 'Елена', 'Галина', 'Татьяна', 'Игорь', 'Алексей', 'Мария', 'Марина', 'Михаил', 'Екатерина', 'Тарас', 'Мирослава',
];

//  функция получения случайного элемента из массива
const getRandomArrayElement = (elemets) => {
  return elemets[getRandomInteger(0, elemets.length - 1)];
};

const createOfferList = new Array(SIMILAR_OBJECT_COUNT).fill(null).map(function (index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomArrayElement(FOTO_DESC),
    likes: getRandomInteger(15, 200),
    comments: {
      id: Number(getRandomInteger(0, 2000) + getRandomInteger(100, 300)),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(COMMENTS_TEXT),
      name: getRandomArrayElement(COMMENTS_NAME),
    },
  };
});
createOfferList();
// console.log(createOfferList);
