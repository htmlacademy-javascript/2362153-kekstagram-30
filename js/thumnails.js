import { getPictures } from './mock.js';

const picturesElement = document.querySelector('.pictures');
const pictureFragment = document.querySelector('#picture').content.querySelector('.picture');
const pictureListFragment = document.createDocumentFragment();

const similarPhotos = getPictures(25);

console.log(similarPhotos);

similarPhotos.forEach(({ comments, description, likes, url }) => {
  const pictureElement = pictureFragment.cloneNode(true);

  const pictureImg = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureImg.src = url;
  pictureImg.alt = description;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length.toString();

  pictureListFragment.append(pictureElement);
});

picturesElement.append(pictureListFragment);
