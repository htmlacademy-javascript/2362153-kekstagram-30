import { renderThumbnails } from './thumbnails.js';
import { container } from './thumbnails.js';

const imgFilter = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

export const ShowFilter = () => imgFilter.classList.remove('img-filters--inactive');

const buttonsFilters = document.querySelectorAll('.img-filters__button');

const onButtonsFiltersClick = () => {
  for (const button of buttonsFilters) {
    button.addEventListener('click', function () {
      buttonsFilters.forEach((i) => i.classList.remove('img-filters__button--active'));
      this.classList.toggle('img-filters__button--active');
    });
  }
};

export const onFilterDefaultClick = (pictures) => {
  filterDefault.addEventListener('click', () => {
    onButtonsFiltersClick();
    const allPictures = container.querySelectorAll('a');
    allPictures.forEach((child) => container.removeChild(child));
    renderThumbnails(pictures);
  });
};

/**
 *
 * @param {Array} pictures
 */
const filterRandomPictures = (pictures) => {
  pictures.sort(() => Math.random() - 0.5);
};

export const onFilterRandomClick = (pictures) => {
  filterRandom.addEventListener('click', () => {
    onButtonsFiltersClick();

    const allPictures = container.querySelectorAll('a');
    allPictures.forEach((child) => container.removeChild(child));
    filterRandomPictures(pictures);
    renderThumbnails(pictures.slice(1, 10));
  });
};

const filterDiscussedPicture = (pictures) => {
  const arrayCommentsLengths = [];
  for (let i = 0; i < pictures.length; i++) {
    arrayCommentsLengths.push(pictures[i]);
  }
  arrayCommentsLengths.sort((a, b) => b.comments.length - a.comments.length);
  return arrayCommentsLengths;
};

export const onFilterDiscussedClick = (pictures) => {
  filterDiscussed.addEventListener('click', () => {
    onButtonsFiltersClick();

    const allPictures = container.querySelectorAll('a');
    allPictures.forEach((child) => container.removeChild(child));
    renderThumbnails(filterDiscussedPicture(pictures));
  });
};
