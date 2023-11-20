import { onKeyDownEscape } from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

const onCloseButtonClick = () => hideMessage();

function onBodyClick (evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }

  hideMessage();
}

const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  element.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (onKeyDownEscape(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

export const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

export const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};
