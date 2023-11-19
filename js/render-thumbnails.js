import { getTemplate, renderFew } from './util.js';
import { onOpenBigPicture } from './full-picture.js';

const template = getTemplate('picture');
const container = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const img = thumbnail.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  thumbnail.addEventListener('click', () => {
    onOpenBigPicture(photo);
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  renderFew(photos, container, createThumbnail);
};

export { renderThumbnails, container };
