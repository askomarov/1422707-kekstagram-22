/* global _:readonly */
import { createPicturesElemts } from './create-pictures-elemtns.js';
import { getRandomUniqElemets } from './util.js';

const RANDOM_COUNT = 10;
const RERENDER_DELAY = 500;

const imgFilter = document.querySelector('.img-filters');
const imgFilterBtnDefault = document.querySelector('#filter-default');
const imgFilterBtnRandom = document.querySelector('#filter-random');
const imgFilterBtnDiscussed = document.querySelector('#filter-discussed');

const showImgFilter = () => {
  if (imgFilter) {
    if (imgFilter.classList.contains('img-filters--inactive')) {
      imgFilter.classList.remove('img-filters--inactive');
    }
  }
};

const delPictures = () => {
  document.querySelectorAll('.picture').forEach(picture => {
    picture.remove();
  });
};
// «Обсуждаемые» — фотографии, отсортированные в порядке убывания количества комментариев.
const compareComments = (data) => {
  const sortedData = data.sort(function (a, b) {
    const commentsA = a.comments.length;
    const commentsB = b.comments.length;
    if (commentsB > commentsA) {
      return 1;
    }
    if (commentsB < commentsA) {
      return -1;
    }
    return 0;
  });
  return sortedData;
};

const btnDiscussedListener = (data) => {
  imgFilterBtnDiscussed.addEventListener('click', _.debounce(
    (() => {
      delPictures();
      createPicturesElemts(compareComments(data));
    }
    ), RERENDER_DELAY,
  ));
};

const getDefaultData = (data) => {
  const sortedData = data.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
  return sortedData;
};

const btnDefaultListener = (data) => {
  imgFilterBtnDefault.addEventListener('click', _.debounce(
    (() => {
      delPictures();
      createPicturesElemts(getDefaultData(data));
    }), RERENDER_DELAY,
  ));
};

const createRandomImg = (data) => {
  const randomData = getRandomUniqElemets(data, RANDOM_COUNT);
  createPicturesElemts(randomData);
};

const btnRandomListener = (data) => {
  imgFilterBtnRandom.addEventListener('click', _.debounce(
    (() => {
      delPictures();
      createRandomImg(data);
    }), RERENDER_DELAY,
  ));
};

const renderFilteredImages = (data) => {
  btnDefaultListener(data);
  btnRandomListener(data);
  btnDiscussedListener(data);
};

export { showImgFilter, renderFilteredImages };
