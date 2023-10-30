import { renderComments } from "./render-comments";

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');

// закрытие большой картинки

const closeBigPicture = (picture) => {
  const closeButton = picture.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', () => {
    picture.classList.add('hidden');
    body.classList.remove('.modal-open');
  });
  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      picture.classList.add('hidden');
      body.classList.remove('.modal-open');
    }
  });
}

//открытие миниатюры в полноэкранном режиме

const openBigPicture = (photo) => {
    body.classList.add('.modal-open');

    bigPicture.classList.remove('hidden');

    const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    bigPictureImg.src = photo.url;
    bigPictureImg.alt = photo.alt;

    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;


    renderComments(photo.comments);
    closeBigPicture(bigPicture);
}

export { openBigPicture };
