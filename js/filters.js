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

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min + 1));

const filterHandlers = {
  [filterEnum.DEFAULT]: (data) => data,
  [filterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [filterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length)
};

let currentFilter = filterEnum.DEFAULT;

const reRender = (evt, filter, data) => {
  if (currentFilter !== filter) {
    const filteredData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderThumbnails(filteredData);
    const currentActive = filterForm.querySelector('.img-filters__button--active');
    currentActive.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = filter;
  }
};
const debounceReRender = debounce(reRender, RERENDER_DELAY);

export const showFilter = (data) => {
  imgFilter.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', (evt) => {
    debounceReRender(evt, filterEnum.DEFAULT, data);
  });
  randomButton.addEventListener('click', (evt) => {
    debounceReRender(evt, filterEnum.RANDOM, data);
  });
  discussedButton.addEventListener('click', (evt) => {
    debounceReRender(evt, filterEnum.DISCUSSED, data);
  });
};
