import { container, renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

const imgFilter = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const RERENDER_DELAY = 500;

const buttonsFilters = document.querySelectorAll('.img-filters__button');

const onButtonsFiltersClick = () => {
  for (const button of buttonsFilters) {
    button.addEventListener('click', function () {
      buttonsFilters.forEach((i) => i.classList.remove('img-filters__button--active'));
      this.classList.toggle('img-filters__button--active');
    });
  }
};

/**
*
* @param {Array} pictures
*/
const filterRandomPictures = (pictures) => {
  pictures.sort(() => Math.random() - 0.5);
};

const filterDiscussedPicture = (pictures) => {
  const arrayCommentsLengths = [];
  for (let i = 0; i < pictures.length; i++) {
    arrayCommentsLengths.push(pictures[i]);
  }
  arrayCommentsLengths.sort((a, b) => b.comments.length - a.comments.length);
  return arrayCommentsLengths;
};

export const ShowFilter = () => imgFilter.classList.remove('img-filters--inactive');

export const onFilterDefaultClick = (pictures) => {
  filterDefault.addEventListener('click', debounce(() => {
    onButtonsFiltersClick();
    const allPictures = container.querySelectorAll('a');
    allPictures.forEach((child) => container.removeChild(child));
    renderThumbnails(pictures);
  }, RERENDER_DELAY,)
  );
};

export const onFilterRandomClick = (pictures) => {
  filterRandom.addEventListener('click', debounce(() => {
    onButtonsFiltersClick();

    const allPictures = container.querySelectorAll('a');
    allPictures.forEach((child) => container.removeChild(child));
    filterRandomPictures(pictures);
    renderThumbnails(pictures.slice(1, 10));
  }, RERENDER_DELAY,)
  );
};

export const onFilterDiscussedClick = (pictures) => {
  filterDiscussed.addEventListener('click', debounce(() => {
    onButtonsFiltersClick();

    const allPictures = container.querySelectorAll('a');
    allPictures.forEach((child) => container.removeChild(child));
    renderThumbnails(filterDiscussedPicture(pictures));
  }, RERENDER_DELAY,)
  );
};
