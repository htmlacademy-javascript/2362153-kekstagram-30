import { renderThumbnails } from './render-thumbnails.js';
import { debounce } from './util.js';

const MAX_RANDOM_FILTER = 10;
const RERENDER_DELAY = 500;
const ACTIVE_CLASS = 'img-filters__button--active';

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const FilterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => {
    const randomData = data.sort(() => Math.random() - 0.5).slice(0, MAX_RANDOM_FILTER);
    return randomData;
  },
  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length)
};

const imgFilter = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultButton = imgFilter.querySelector('#filter-default');
const randomButton = imgFilter.querySelector('#filter-random');
const discussedButton = imgFilter.querySelector('#filter-discussed');

let activeButton = defaultButton;

const changeClasses = (button) => {
  activeButton.classList.remove(ACTIVE_CLASS);
  button.classList.add(ACTIVE_CLASS);
  activeButton = button;
};

const clearContainer = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
};

const reRender = (filter, data) => {
  const filteredData = FilterHandlers[filter](data);
  clearContainer();
  renderThumbnails(filteredData);
};

const debounceReRender = debounce(reRender, RERENDER_DELAY);

export const showFilter = (data) => {
  imgFilter.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', (evt) => {
    const target = evt.target;
    if(!target.classList.contains('img-filters__button') || target === activeButton){
      return;
    }
    changeClasses(target);

    if (target === defaultButton) {
      debounceReRender(FilterEnum.DEFAULT, data);
    }
    if (target === randomButton) {
      debounceReRender(FilterEnum.RANDOM, data);
    }
    if (target === discussedButton) {
      debounceReRender(FilterEnum.DISCUSSED, data);
    }
  });
};
