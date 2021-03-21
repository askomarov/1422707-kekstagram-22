import { isEscEvent } from './util.js';

const DEFAULT_VISIBLE_COMMENTS = 5;

const bigPic = document.querySelector('.big-picture');
const closeBigImg = bigPic.querySelector('.big-picture__cancel');
const socialCommentCountBlock = bigPic.querySelector('.social__comment-count');
const btnSocialCommentsLoader = bigPic.querySelector('.social__comments-loader');
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
};

const openBigPicture = () => {
  bigPic.classList.remove('hidden');
  document.body.classList.add('modal-open')
  document.addEventListener('keydown', onPopupEscKeydown);

  socialCommentCountBlock.classList.add('hidden');
  // при открытии запускаем проверку на комменты, показываем разрешенное кол-во
  showVisibleComments();
};

const closeBigPicture = () => {
  bigPic.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  btnSocialCommentsLoader.removeEventListener('click', onBtnComment)
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
