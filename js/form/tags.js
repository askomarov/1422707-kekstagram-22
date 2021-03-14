import { isEscEvent } from '../util.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const inputTags = uploadOverlay.querySelector('.text__hashtags');
const commentInput = uploadOverlay.querySelector('.text__description');

// валидный тег - это тот что начинается с решетки и дальше содержит от 1 до 19
// любого алфавитно-цифрового символа из базового латинского алфавита [A-Za-z0-9_]
const validateTag = (tag) => {
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp
  // создадим регульярное выражение
  const regexp = /^#\w{1,19}$/;
  // проверяем тег на совадение нашему проварилу минимум два символа решетка и еще буква или цифра
  // если метод match не нешал совпадение то значение
  // matchIt будет присвоено null и в этом случаем получим matchIt !== null вернет false, проверка не пройдена
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/match
  const matchIt = tag.match(regexp);
  // -------- проверяем соответсвие правилу
  // if (matchIt !== null) {
  //   // console.log(matchIt);
  //   console.log('проверка пройдена');
  //   return true;
  // } else {
  //   console.log('проверка не пройдена');
  //   return false;
  // }
  // -------- или так
  // return matchIt !== null ? true : false ;
  // -------- или так
  return matchIt !== null;
};
// чтобы получить отдельный тег из инпута надо разобрать введеный текст
const runValidateTags = (string) => {
  // trim удаляет пустые пробелы и длина введеного в инпут будет равно 0 - значит ошибка
  // защита от введения пустоты))
  if (string.trim().length === 0) {
    inputTags.setCustomValidity('введите текст');
    return false;
  }
  // далее разбиваем введеный текст на отдельные слова, получаем массив тегов и проверяем чтобы его длинна
  // была не равна 0, значит хотя бы 1 тег-слово есть
  const tags = string.toLowerCase().split(' ').filter((tag) => tag.length !== 0);
  // Метод доступа size возвращает количество (уникальных) элементов в объекте Set
  // т.е если введны все уникальне теги то длина оригинального массива и кол-во уникальных тегов полученных new Set(tags).size
  // будут равны, тогда код будет выполняться дальше
  // если ввели одниковые теги будет ошибка
  if (tags.length !== new Set(tags).size) {
    inputTags.setCustomValidity('Хэштеги должны быть уникальны');
    return false;
  }
  // если длина массива с тегами больше 5 - ошибка
  if (tags.length > 5) {
    inputTags.setCustomValidity('Количество хэштегов не должно превышать 5');
    return false;
  }
  // проходим по каждому тегу
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    // проверка начала каждого тега, если не решетка - ошибка
    // хотя у нас уже проверяется решетка регулярным варажением
    // но чтобы выводить сообщение об конкретной ошибке добавим еще эту проверку
    if (!tag.startsWith('#')) {
      inputTags.setCustomValidity('Хэштег должен начинаться с символа #');
      return false;
    }
    // проверяем тег по нашему регулярному выражению
    if (!validateTag(tag)) {
      inputTags.setCustomValidity('Хэштег может состоять только из букв и чисел');
      return false;
    }
  }
  // если всё тру ошибка сбрасывается
  inputTags.setCustomValidity('');
  return true;
};

const onInputTagValidateListener = () => {
  // как только мы в инпуте, вешает обработчик ECS
  inputTags.addEventListener('keydown', onEcsKeyDown)

  inputTags.addEventListener('input', () => {
    const inputText = inputTags.value;
    // если проверка возвращает false - выводится ошибка
    if (runValidateTags(inputText) === false) {
      inputTags.reportValidity();
    }
  });
};

const onCommentInputListener = () => {
  commentInput.addEventListener('keydown', onEcsKeyDown)
}

const onEcsKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // прекращает слушать нажатую кнопку
    // т.е модальное окно по клику на ECS не закроется
    evt.stopPropagation();
  }
};

export { onInputTagValidateListener, onCommentInputListener };

