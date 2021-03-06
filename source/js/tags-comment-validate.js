import { isEscEvent } from './util.js';

const COMMENT_MAX_LENGTH = 140;
const VALID_TAGS_LENGTH = 5;
// создадим регулярное выражение
// \w - латинский алфавит
// \u0400-\u04FF  - кириллица
const REG_EXP = /^#[\w,\u0400-\u04FF]{1,19}$/;

const uploadOverlay = document.querySelector('.img-upload__overlay');
const inputTags = uploadOverlay.querySelector('.text__hashtags');
const commentInput = uploadOverlay.querySelector('.text__description');

// валидный тег - это тот что начинается с решетки и дальше содержит от 1 до 19
// любого алфавитно-цифрового символа из базового латинского алфавита [A-Za-z0-9_]
const checkValidityTag = (tag) => {
  // проверяем тег на совадение нашему проварилу минимум два символа решетка и еще буква или цифра
  // если метод match не нешал совпадение то значение
  // matchIt будет присвоено null и в этом случаем получим matchIt !== null вернет false, проверка не пройдена
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/match
  const matchIt = tag.match(REG_EXP);
  // -------- возвращаем результут проверки соответсвия правилу
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
  if (tags.length > VALID_TAGS_LENGTH) {
    inputTags.setCustomValidity('Количество хэштегов не должно превышать 5');
    return false;
  }
  // проверка начала каждого тега, если не решетка - ошибка
  // хотя у нас уже проверяется решетка регулярным варажением
  // но чтобы выводить сообщение об конкретной ошибке добавим еще эту проверку

  // проходим по каждому тегу
  if (!tags.every((tag) => tag.startsWith('#'))) {
    inputTags.setCustomValidity('Хэштег должен начинаться с символа #');
    return false;
  }
  // проверяем тег по нашему регулярному выражению
  if (!tags.every((tag) => checkValidityTag(tag))) {
    inputTags.setCustomValidity('Хэштег может состоять только из букв и чисел');
    return false;
  }

  // если всё тру ошибка сбрасывается
  inputTags.style.boxShadow = '';
  inputTags.setCustomValidity('');
  return true;
};

const onInputTagValidateListener = () => {
  // как только мы в инпуте, вешает обработчик ECS
  inputTags.addEventListener('keydown', stopPropagationKeyEsc);

  inputTags.addEventListener('input', () => {
    const inputText = inputTags.value;
    // если проверка возвращает false - выводится ошибка
    if (!runValidateTags(inputText)) {
      inputTags.style.boxShadow = 'inset 0 0 3px 1px red';
      inputTags.reportValidity();
    }
  });
};

const onInputCommentValidateListener = () => {
  commentInput.addEventListener('keydown', stopPropagationKeyEsc);
  commentInput.addEventListener('input', () => {
    if (commentInput.value.length > COMMENT_MAX_LENGTH) {
      commentInput.setCustomValidity('Комментарий не должен превышать 140 символов; Удалите лишние ' + (commentInput.value.length - COMMENT_MAX_LENGTH) + ' симв.')
      commentInput.style.boxShadow = 'inset 0 0 5px 3px red';
    } else {
      commentInput.setCustomValidity('');
      commentInput.style.boxShadow = '';
    }
    commentInput.reportValidity();
  });
};

const stopPropagationKeyEsc = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // прекращает слушать нажатую кнопку
    // т.е модальное окно по клику на ECS не закроется
    evt.stopPropagation();
  }
};

export { onInputTagValidateListener, onInputCommentValidateListener };

