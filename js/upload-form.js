
import { resetScale } from './scale-img';
import { uploadForm, hashtags, description, pristine, resetValidation, toggleSubmitButton } from './validation';
import { sendPictures } from './api';
import { resetEffect } from './slider-effects';
import { showErrorMessage, showSuccessMessage } from './message';

const imgEdit = uploadForm.querySelector('.img-upload__overlay');
const imgInput = uploadForm.querySelector('.img-upload__input');

const toggle = (isOpen = true) => {
  imgEdit.classList.toggle('hidden', !isOpen);
  document.body.classList.toggle('modal-open', isOpen);
};

const closeForm = () => {
  uploadForm.reset();
  resetScale();
  resetValidation();
  resetEffect();
};

const onCloseImgEdit = () => {
  toggle(false);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onOpenImgEdit = () => {
  toggle();
  document.addEventListener('keydown', onDocumentKeydown);
};
const isErrorExists = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if (!(hashtags === document.activeElement || description === document.activeElement)) {
    if (evt.key === 'Escape' && !isErrorExists()) {
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

