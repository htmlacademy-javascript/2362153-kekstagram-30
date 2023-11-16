import { renderComments, bigPicture } from './render-comments';


const body = document.querySelector('body');

const closeButton = document.querySelector('.big-picture__cancel');
closeButton.addEventListener('click', onCloseBigPicture);

// закрытие большой картинки

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onCloseBigPicture();
  }
};

function onCloseBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

//открытие миниатюры в полноэкранном режиме

const onOpenBigPicture = (photo) => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.alt;

  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  renderComments(photo.comments);
};

export { onOpenBigPicture };
