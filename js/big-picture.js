import { isEscEvent } from './util.js'

const bigPic = document.querySelector('.big-picture');
const closeBigImg = bigPic.querySelector('.big-picture__cancel');
const socialCommentCountBlock = bigPic.querySelector('.social__comment-count');
const socialCommentsLoader = bigPic.querySelector('.social__comments-loader');
//
const bigPicCommentsList = bigPic.querySelector('.social__comments');

// фрагмент для комментариев
const commentsFragments = new DocumentFragment();
// функция генерации элемента комментария
const createCommentElemnt = (item) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment')
  commentElement.innerHTML = `<img
      class="social__picture"
      src="${item.avatar}"
      alt="${item.name}"
      width="35" height="35">
  <p class="social__text">${item.message}</p>`
  commentsFragments.appendChild(commentElement);
};
//  // вставляем в список комментариев - фото и текст автора комментария к конкретной фотографии
const renderCommets = (item) => {
  const comments = item.comments;
  if (comments.length === 0) {
    bigPicCommentsList.innerHTML = '';
  } else {
    comments.forEach(comment => {
      bigPicCommentsList.innerHTML = '';
      createCommentElemnt(comment);
    })
    bigPicCommentsList.appendChild(commentsFragments);
  }
}
const openBigPicture = () => {
  bigPic.classList.remove('hidden');
  document.body.classList.add('modal-open')
  document.addEventListener('keydown', onPopupEscKeydown);

  socialCommentCountBlock.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');
};

const closeBigPicture = () => {
  bigPic.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const showBigPicture = (minPicture) => {
  bigPic.querySelector('.big-picture__img > img').src = minPicture.url;
  bigPic.querySelector('.social__caption').textContent = minPicture.description;
  bigPic.querySelector('.likes-count').textContent = minPicture.likes;
  bigPic.querySelector('.comments-count').textContent = minPicture.comments.length;

  openBigPicture();
  closeBigImg.addEventListener('click', () => {
    closeBigPicture()
  });
};

export { showBigPicture, renderCommets };
