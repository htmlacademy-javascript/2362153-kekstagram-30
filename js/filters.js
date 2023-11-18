import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

const imgFilter = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultButton = imgFilter.querySelector('#filter-default');
const randomButton = imgFilter.querySelector('#filter-random');
const discussedButton = imgFilter.querySelector('#filter-discussed');
const RERENDER_DELAY = 500;
const MAX_RANDOM_FILTER = 10;

const filterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filterHandlers = {
  [filterEnum.DEFAULT]: (data) => data,
  [filterEnum.RANDOM]: (data) => {
    const randomData = data.sort(() => Math.random() - 0.5).slice(0, MAX_RANDOM_FILTER);
    return randomData;
  },
  [filterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length)
};

const sortedButtons = (evt) => {
  const currentActive = filterForm.querySelector('.img-filters__button--active');
  currentActive.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const clearContainer = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
};

const reRender = (filter, data) => {
  const filteredData = filterHandlers[filter](data);
  clearContainer();
  renderThumbnails(filteredData);
};

const debounceReRender = debounce(reRender, RERENDER_DELAY);

export const showFilter = (data) => {
  imgFilter.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', (evt) => {
    const target = evt.target;
    sortedButtons(evt);

    if (target === defaultButton) {
      debounceReRender(filterEnum.DEFAULT, data);
    }
    if (target === randomButton) {
      debounceReRender(filterEnum.RANDOM, data);
    }
    if (target === discussedButton) {
      debounceReRender(filterEnum.DISCUSSED, data);
    }
  });
};
