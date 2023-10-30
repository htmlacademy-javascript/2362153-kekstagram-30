import { getTemplate, renderFew } from './util.js';
import './render-comments.js'

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
    const bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');

    const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    bigPictureImg.src = photo.url;
    bigPictureImg.alt = photo.alt;

    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    //добавление комментариев

  const createComment = (comment) => {
  const oneComment = document.createElement('li');
  oneComment.className = 'social__comment';

  const avatarOneComment = document.createElement('img');
  avatarOneComment.className = 'social__picture';
  avatarOneComment.src = comment.avatar;
  avatarOneComment.alt = comment.name;
  avatarOneComment.width = 35;
  avatarOneComment.height = 35;

  const textOneComment = document.createElement('p');
  textOneComment.className = 'social__text';
  textOneComment.textContent = comment.message;

  oneComment.appendChild(avatarOneComment);
  oneComment.appendChild(textOneComment);

  return oneComment;
};

    const allComments = bigPicture.querySelector('.social__comments');
    bigPicture.querySelector('.social__comment-shown-count').textContent = photo.comments.length.toString();
    bigPicture.querySelector('.social__comment-total-count').textContent = photo.comments.length.toString();

    allComments.innerHTML = '';
    photo.comments.forEach(comment => {
      const newComment = createComment(comment);
      allComments.appendChild(newComment);
    });

    // закрытие большой картинки
    const closeButton = bigPicture.querySelector('.big-picture__cancel');
    closeButton.addEventListener('click', () => {
      bigPicture.classList.add('hidden');
    });
    document.addEventListener('keydown', (evt) => {
      if(evt.key === 'Escape') {
        evt.preventDefault();
        bigPicture.classList.add('hidden');
      }
    })
  });

  return thumbnail;
};

export const renderThumbnails = (photos) => renderFew(photos, container, createThumbnail);
