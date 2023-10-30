import { getTemplate } from './util.js';
import './full-picture.js';
import { openBigPicture } from './full-picture.js';

const template = getTemplate('picture');
const container = document.querySelector('.pictures');

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
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const element = createThumbnail(photo);
    fragment.appendChild(element);
  });

  container.appendChild(fragment);
}

export {renderThumbnails};
