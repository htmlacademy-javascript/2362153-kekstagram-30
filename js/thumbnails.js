import { getTemplate } from './util.js';
import { openBigPicture, closeBigPicture } from './full-picture.js';

const template = getTemplate('picture');
const container = document.querySelector('.pictures');
const closeButton = document.querySelector('.big-picture__cancel');

const createThumbnail = (photo) => {
/** @type {HTMLAnchorElement} */

  const thumbnail = template.cloneNode(true);
  const img = thumbnail.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.alt;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  //открытие миниатюры в полноэкранном режиме

  thumbnail.addEventListener('click', () => {
    openBigPicture(photo);

    closeButton.addEventListener('click', closeBigPicture);
  });

  return thumbnail;
};

/**
 *
 * @param {Array} photos
 */

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const element = createThumbnail(photo);
    fragment.appendChild(element);

  });

  container.appendChild(fragment);
}

export {renderThumbnails};
