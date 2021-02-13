import { getRandomInteger, getRandomArrayElement } from './util.js'
const SIMILAR_OBJECT_COUNT = 25;

const photoDesc = [
  'здесь должно быть описание', 'прекрасная фотография чего-то', 'это произведение искусства!', 'однажды в родном городе', 'это было в нашем путешествии',
]

const commentText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const commentName = [
  'Артем', 'Сергей', 'Максим', 'Виталий', 'Елена', 'Галина', 'Татьяна', 'Игорь', 'Алексей', 'Мария', 'Марина', 'Михаил', 'Екатерина', 'Тарас', 'Мирослава',
];

const createOfferList = () => new Array(SIMILAR_OBJECT_COUNT).fill(null).map(function (index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomArrayElement(photoDesc),
    likes: getRandomInteger(15, 200),
    comments: {
      id: Number(getRandomInteger(0, 2000) + getRandomInteger(100, 300)),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(commentText),
      name: getRandomArrayElement(commentName),
    },
  };
});
export { createOfferList };
