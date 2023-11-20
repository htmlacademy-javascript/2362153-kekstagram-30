
import { resetScale } from './scale-img.js';
import { uploadForm, hashtags, description, pristine, resetValidation, toggleSubmitButton } from './validation.js';
import { sendPictures } from './api.js';
import { resetEffect } from './slider-effects.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';
import { onKeyDownEscape } from './util.js';

const imgEdit = uploadForm.querySelector('.img-upload__overlay');
const imgInput = uploadForm.querySelector('.img-upload__input');

const closeForm = () => {
  uploadForm.reset();
  resetScale();
  resetValidation();
  resetEffect();
};

const onCloseImgEdit = () => {
  imgEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onOpenImgEdit = () => {
  imgEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isErrorExists = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if (!(hashtags === document.activeElement || description === document.activeElement)) {
    if (onKeyDownEscape(evt) && !isErrorExists()) {
      evt.preventDefault();
      closeForm();
    }
  }
}

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPictures(new FormData(uploadForm));
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
};

uploadForm.addEventListener('submit', onFormSubmit);
imgInput.addEventListener('change', onOpenImgEdit);
uploadForm.addEventListener('reset', onCloseImgEdit);

