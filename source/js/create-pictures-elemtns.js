import { showBigPicture, renderCommets } from './big-picture.js';

const createPicturesElemts = (pictures) => {
  // родитель в который надо вставить сгенирированыне элементы
  const picturesElementsList = document.querySelector('.pictures');
  // html шаблон который будем копировать
  const pictureElementTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const similiarPicturesFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    // копируем шаблон со всем его содержимым true в новую переменную
    const pictureElemet = pictureElementTemplate.cloneNode(true);

    pictureElemet.querySelector('.picture__img').src = picture.url;
    pictureElemet.querySelector('.picture__likes').textContent = picture.likes;
    pictureElemet.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElemet.querySelector('.picture__img').alt = picture.description;
    // добавляем каждый элемент в созданный DocumentFragment
    similiarPicturesFragment.appendChild(pictureElemet);

    pictureElemet.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderCommets(picture);
      showBigPicture(picture);
    })
  })
  // добваляем в родитель фрагмент с готовыми картинками
  picturesElementsList.appendChild(similiarPicturesFragment);
}

export { createPicturesElemts };
