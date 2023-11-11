
import { resetScale } from './scale-img';
import { uploadForm, hashtags, description, pristine, resetValidation } from './validation';

const imgEdit = uploadForm.querySelector('.img-upload__overlay');
const imgInput = uploadForm.querySelector('.img-upload__input');

const toggle = (isOpen = true) => {
  imgEdit.classList.toggle('hidden', !isOpen);
  document.body.classList.toggle('modal-open', isOpen);
};

// Закрытие окна редактирования изображения
const closeForm = () => uploadForm.reset();

const onCloseImgEdit = () => {
  toggle(false);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onOpenImgEdit = () => {
  toggle();
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (!(hashtags === document.activeElement || description === document.activeElement)) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeForm();
    }
  }
}

uploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
    resetScale();
    resetValidation();
  }
});

imgInput.addEventListener('change', onOpenImgEdit);
uploadForm.addEventListener('reset', onCloseImgEdit);

