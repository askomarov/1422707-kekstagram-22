import { isEscEvent } from './util.js';

const DEFAULT_VISIBLE_COMMENTS = 5;

const bigPic = document.querySelector('.big-picture');
const closeBigImg = bigPic.querySelector('.big-picture__cancel');
const socialCommentCountBlock = bigPic.querySelector('.social__comment-count');
const btnSocialCommentsLoader = bigPic.querySelector('.social__comments-loader');
const bigPicCommentsList = bigPic.querySelector('.social__comments');

const onLikesCountClick = (evt) => {
  if (evt.target.classList.contains('likes-count--active')) {
    evt.target.textContent = Number(evt.target.textContent) - 1;
    evt.target.classList.remove('likes-count--active');
    return;
  } else {
    evt.target.textContent = Number(evt.target.textContent) + 1;
    evt.target.classList.add('likes-count--active');
    return;
  }
};

const onLikesCountClickListener = () => {
  const likesCount = document.querySelector('.likes-count');
  likesCount.addEventListener('click', onLikesCountClick)
};

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
};

const renderCommentsCount = (num, length) => {
  socialCommentCountBlock.innerHTML = `${num} из <span class="comments-count">${length}</span> комментариев`;
};

const openBigPicture = () => {
  bigPic.classList.remove('hidden');
  document.body.classList.add('modal-open')
  document.addEventListener('keydown', onPopupEscKeydown);

  // socialCommentCountBlock.classList.add('hidden');
  // при открытии запускаем проверку на комменты, показываем разрешенное кол-во
  showVisibleComments();
  onLikesCountClickListener();
};

const closeBigPicture = () => {
  bigPic.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  btnSocialCommentsLoader.removeEventListener('click', onBtnComment);
  // likesCount.removeEventListener('click', onLikesCountClick)
  // при закрытии большой картинки - снова приравниваем к 5 допустимое число видимых комментариев
  visibleCommentsLength = DEFAULT_VISIBLE_COMMENTS;
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
  onBtnCommetLoaderListener();
  closeBigImg.addEventListener('click', () => {
    closeBigPicture();
  });
};

// допустимое число видимых комментариев
let visibleCommentsLength = DEFAULT_VISIBLE_COMMENTS;
// проверяем кол-во комментариев, если их меньше 5 - кнопке "загрузть еще"добавялем класс Hidden
// если их больше 5 - удаляем у кнопки класс hidden
//  если больше 5 - находим все комментарии с индексом равному или больше числу visibleCommentsLength и добавляем их класс hidden
const showVisibleComments = () => {
  const comments = document.querySelectorAll('.social__comment');
  if (comments.length > DEFAULT_VISIBLE_COMMENTS) {
    btnSocialCommentsLoader.classList.remove('hidden');
    renderCommentsCount(visibleCommentsLength, comments.length);
    for (let index = 0; index < comments.length; index++) {
      const element = comments[index];
      if (index >= visibleCommentsLength) {
        element.classList.add('hidden');

      }
      else {
        element.classList.remove('hidden');
      }
    }
  }
  if (comments.length <= visibleCommentsLength) {
    renderCommentsCount(comments.length, comments.length);
    btnSocialCommentsLoader.classList.add('hidden');
  }
};

const onBtnComment = (evt) => {
  evt.preventDefault();
  // на каждый клик по кнопке "показать еще" прибавялем значение видимых комментариев на 5
  visibleCommentsLength = visibleCommentsLength + 5;
  // и запускаем проверку чтобы отобразить
  showVisibleComments();
};

const onBtnCommetLoaderListener = () => {
  btnSocialCommentsLoader.addEventListener('click', onBtnComment)
};
export { showBigPicture, renderCommets };
