import { renderComments, bigPicture } from './render-comments.js';
import { onKeyDownEscape } from './util.js';

const body = document.querySelector('body');

const closeButton = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (onKeyDownEscape(evt)) {
    evt.preventDefault();
    onCloseBigPicture();
  }
};

function onCloseBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onOpenBigPicture = (photo) => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  bigPictureImg.src = photo.url;
  bigPictureImg.set = photo.alt;

  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  renderComments(photo.comments);
};

closeButton.addEventListener('click', onCloseBigPicture);

export { onOpenBigPicture };
