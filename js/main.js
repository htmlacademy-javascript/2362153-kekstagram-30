import { renderThumbnails } from './render-thumbnails.js';
import './new-img.js';
import './upload-form.js';
import './scale-img.js';
import './slider-effects.js';
import { loadPictures } from './api.js';
import { showError } from './util.js';
import { showFilter } from './filters.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderThumbnails(pictures);
    showFilter(pictures);
  } catch {
    showError();
  }
};

bootstrap();
