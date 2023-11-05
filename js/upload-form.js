const uploadForm = document.querySelector('.img-upload__form');
const imgEdit = uploadForm.querySelector('.img-upload__overlay');
const imgCancel = uploadForm.querySelector('.img-upload__cancel');
const imgInput = uploadForm.querySelector('.img-upload__input');
const hashtags = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');

const validate_default = {
  MAX_HASHTAG: 5,
  MAX_SIMBOLS: 140,
  COMMENT_ERR: 'Длина комментария больше 140 символов',
  HASH_COUNT_ERR: 'Использовано максимальное количество хэштегов',
  HASH_LENGTH_ERR: 'Недопустимая длина хэштега',
  HASH_REGEX_ERR: 'Использованы недопустимые спецсимволы',
  HASH_DUPLICATE_ERR: 'Хэштеги повторяются'
};

const toggle = (isOpen = true) => {
  imgEdit.classList.toggle('hidden', !isOpen);
  document.body.classList.toggle('modal-open', isOpen);
};

// Закрытие окна редактирования изображения

const onCloseImgEdit = () => {
  toggle(false);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onOpenImgEdit = () => {
  toggle();
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if(!(hashtags === document.activeElement || description === document.activeElement)) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onCloseImgEdit();
    }
  }
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p'
});

pristine.addValidator(
  description,
  (value) => value.length <= 140,
  'Длина комментария больше 140 символов'
);

pristine.addValidator(
  hashtags,
  (value) => {
    const hashtagList = value.trim().split(' ');
    return hashtagList.length - 1 < 5;
  },
  'Использовано максимальное количество хэштегов'
);

pristine.addValidator(
  hashtags,
  (value) => {
    const hashtagList = value.trim().split(' ');
    const regex = /^#[а-яёa-z0-9]{1, 19}$/i;

    for (const hashtag of hashtagList) {
      if (!regex.test(hashtag)) {
        return false;
      }
    }
    return true;
  },
  'Использованы недопустимые спецсимволы или длина хэштега'
);

pristine.addValidator(
  hashtags,
  (value) => {
    const hashtagList = value.trim().toLowerCase().split(' ');

    const duplicates = hashtagList.filter((number, index, numbers) => numbers.indexOf(number) !== index);
    if (duplicates.length !== 0) {
      return false;
    }
    return true;
  },
  'Хэштеги повторяются'
);

pristine.addValidator(
  hashtags,
  (value) => {
    const hashtagList = value.trim().split(' ');

    for (const hashtag of hashtagList) {
      if (hashtag.length === 1 && hashtag.length >= 20) {
        return false;
      }
    }
    return true;
  },
  'Недопустимая длина хэштега'
);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  //пока для ДЗ оставлено
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

imgInput.addEventListener('change', onOpenImgEdit);
imgCancel.addEventListener('click', onCloseImgEdit);
