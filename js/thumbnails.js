import { getTemplate, renderFew } from './util.js';
import { onOpenBigPicture } from './full-picture.js';

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
    onOpenBigPicture(photo);
  });

  return thumbnail;
};

/**
 *
 * @param {Array} photos
 */
const renderThumbnails = (photos) => renderFew (photos, container, createThumbnail);

export { renderThumbnails };
