
const createPicturesElemts = (pictures) => {

  const similiarPictures = pictures();

  // получаем наш массив объетов данных для объявлений
  // const similiarPictures = createOfferList();

  // родитель в который надо вставить сгенирированыне элементы
  const picturesElementsList = document.querySelector('.pictures');

  // html шаблон который будем копировать
  const pictureElementTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const similiarPicturesFragment = document.createDocumentFragment();

  similiarPictures.forEach((picture) => {
    // копируем шаблон со всем его содержимым true в новую переменную
    const pictureElemet = pictureElementTemplate.cloneNode(true);

    pictureElemet.querySelector('.picture__img').src = picture.url;
    pictureElemet.querySelector('.picture__likes').textContent = picture.likes;
    pictureElemet.querySelector('.picture__comments').textContent = picture.comments.length;
    // добавляем каждый элемент в созданный DocumentFragment
    similiarPicturesFragment.appendChild(pictureElemet);
  })

  // добваляем в родитель в разметку новый элемент pictureElemet
  picturesElementsList.appendChild(similiarPicturesFragment);
}

export { createPicturesElemts };
