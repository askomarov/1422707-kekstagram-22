/* global _:readonly */
import { createPicturesElemts } from './create-pictures-elemtns.js';
import { getRandomUniqElemets } from './util.js';

const RANDOM_COUNT = 10;
const RERENDER_DELAY = 500;

const imgFilter = document.querySelector('.img-filters');
const filterForm = imgFilter.querySelector('.img-filters__form');
const filterBtns = filterForm.querySelectorAll('.img-filters__button');

const switchFilterBtnActiveClass = () => {
  filterForm.addEventListener('click', (evt) => {
    filterBtns.forEach((btn) => {
      if (evt.target === btn) {
        if (!evt.target.classList.contains('.img-filters__button--active')) {
          return evt.target.classList.add('img-filters__button--active');
        }
      } else {
        btn.classList.remove('img-filters__button--active')
      }
    })
  })
};

const showImgFilter = () => {
  switchFilterBtnActiveClass();
  if (imgFilter) {
    if (imgFilter.classList.contains('img-filters--inactive')) {
      return imgFilter.classList.remove('img-filters--inactive');
    }
  }
};

const delPictures = () => {
  document.querySelectorAll('.picture').forEach(picture => {
    picture.remove();
  });
};
// «Обсуждаемые» — фотографии, отсортированные в порядке убывания количества комментариев.
const sortImagesByComments = (data) => {
  const sortedData = data.sort((a, b) => {
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

const getMostCommentedImges = (data) => {
  createPicturesElemts(sortImagesByComments(data));
};

const sortImagesById = (data) => {
  const sortedData = data.sort((a, b) => {
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

const getDefaultImages = (data) => {
  createPicturesElemts(sortImagesById(data));
};

const getRandomImages = (data) => {
  createPicturesElemts(getRandomUniqElemets(data, RANDOM_COUNT));
};

const onFilterBtnClick = (data, evt) => {
  delPictures();
  if (evt.target.classList.contains('img-filters__button')) {
    switch (evt.target.id) {
      case 'filter-default':
        getDefaultImages(data);
        break;
      case 'filter-random':
        getRandomImages(data);
        break;
      case 'filter-discussed':
        getMostCommentedImges(data);
        break;
    }
  }
};

const sortingImages = (data) => {
  filterForm.addEventListener('click', _.debounce(
    ((evt) => {
      onFilterBtnClick(data, evt)
    }), RERENDER_DELAY))
};

export { showImgFilter, sortingImages };
