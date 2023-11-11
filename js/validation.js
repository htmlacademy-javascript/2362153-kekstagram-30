import Pristine from 'pristinejs';

const uploadForm = document.querySelector('.img-upload__form');
const hashtags = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');

const descriptionDefault = {
  MAX_LENGTH: 140,
  COMMENT_ERR: 'Длина комментария больше 140 символов',
};

const hashtagDefault = {
  MAX_COUNT: 5,
  MAX_SIMBOLS: 20,
  HASH_COUNT_ERR: 'Использовано максимальное количество хэштегов',
  HASH_SIMBOLS_ERR: 'Недопустимая длина хэштега',
  HASH_REGEX_ERR: 'Использованы недопустимые спецсимволы',
  HASH_DUPLICATE_ERR: 'Хэштеги повторяются',
  HASH_START_ERR: 'Хэштег должен начинаться с #',
  HASH_ONLY_ERR: 'Хэштег должен быть длиннее #'
};

const REG_EX = /^#[a-zа-яё0-9]{1,19}$/;

const isUniqueArray = (array) => new Set(array).size === array.length;


export const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p'
});

/**
 *
 * @param {string} value
 */
let hashtagsError = '';

const validateHashtags = (value) => {
  const tags = value.trim().toLowerCase().split(/\s*(?=#)/);

  if (tags.length > hashtagDefault.MAX_COUNT) {
    hashtagsError = hashtagDefault.HASH_COUNT_ERR;
    return false;
  }

  if (!isUniqueArray(tags)) {
    hashtagsError = hashtagDefault.HASH_DUPLICATE_ERR;
    return false;
  }

  return tags.every((tag) => {
    if (tag[0] !== '#') {
      hashtagsError = hashtagDefault.HASH_START_ERR;
      return false;
    }

    if (tag.length > hashtagDefault.MAX_SIMBOLS) {
      hashtagsError = hashtagDefault.HASH_SIMBOLS_ERR;
    }

    if (tag === '#') {
      hashtagsError = hashtagDefault.HASH_ONLY_ERR;
      return false;
    }

    if (!REG_EX.test(tag)) {
      hashtagsError = hashtagDefault.HASH_REGEX_ERR;
      return false;
    }

    return true;
  });
};

pristine.addValidator(hashtags, validateHashtags, () => hashtagsError);
pristine.addValidator(
  description,
  (value) => value.length <= descriptionDefault.MAX_LENGTH,
  descriptionDefault.COMMENT_ERR
);

const validate = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { validate, resetValidation, uploadForm, hashtags, description };
