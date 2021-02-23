import { isEscEvent } from './util.js'

const bigPic = document.querySelector('.big-picture');
const closeBigImg = bigPic.querySelector('.big-picture__cancel');

const openBigPicture = () => {
  bigPic.classList.remove('hidden');
  document.body.classList.add('modal-open')

  document.addEventListener('keydown', onPopupEscKeydown);
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

const doBigPicture = (arrayOfPictures) => {

  const bigPicCommentsList = bigPic.querySelector('.social__comments');

  // фрагмент для комментариев
  const commentFragments = new DocumentFragment();
  // функция генерации элементов комментариев
  const createCommentElemnt = (item) => {
    const commentFragment = document.createElement('li');
    commentFragment.classList.add('social__comment')
    commentFragment.innerHTML = `<img
      class="social__picture"
      src="${item.avatar}"
      alt="${item.name}"
      width="35" height="35">
  <p class="social__text">${item.message}</p>`
    commentFragments.appendChild(commentFragment);
  };

  const bigPicImg = bigPic.querySelector('.big-picture__img > img');
  const bigPicDesc = bigPic.querySelector('.social__caption');
  const bigPicLikesConunt = bigPic.querySelector('.likes-count');
  const bigPicCommentsCount = bigPic.querySelector('.comments-count');
  const socialCommentCountBlock = bigPic.querySelector('.social__comment-count');
  const socialCommentsLoader = bigPic.querySelector('.social__comments-loader');

  const minPictures = document.querySelectorAll('.picture');
  minPictures.forEach((minPicture, index) => {
    const minImgSrc = minPicture.querySelector('.picture__img').src;
    const minImgLikes = minPicture.querySelector('.picture__likes').textContent;
    const minImgCommentCount = minPicture.querySelector('.picture__comments').textContent;
    const minImgAlt = minPicture.querySelector('.picture__img').alt;

    minPicture.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture();

      bigPicImg.setAttribute('src', minImgSrc);
      bigPicLikesConunt.textContent = minImgLikes;
      bigPicCommentsCount.textContent = minImgCommentCount;
      bigPicDesc.textContent = minImgAlt;

      // временно прячем блок счетчик комментариев и загрузки новых
      socialCommentCountBlock.classList.add('hidden');
      socialCommentsLoader.classList.add('hidden');

      // вставляем в список комментариев - фото и текст автора комментария к конкретной фотографии
      const comments = arrayOfPictures[index].comments;
      if (comments.length === 0) {
        bigPicCommentsList.innerHTML = '';
      } else {
        comments.forEach(comment => {
          bigPicCommentsList.innerHTML = '';
          createCommentElemnt(comment);
        })
        bigPicCommentsList.appendChild(commentFragments);
      }
    })
  });

  closeBigImg.addEventListener('click', () => {
    closeBigPicture()
  });
};

export { doBigPicture };
