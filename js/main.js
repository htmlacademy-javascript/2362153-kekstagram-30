import { renderThumbnails } from './thumbnails.js';
import './upload-form.js';
import './scale-img.js';
import './slider-effects.js';
import { loadPictures } from './api.js';
import { showError } from './util.js';
import { ShowFilter, onFilterDefaultClick, onFilterRandomClick, onFilterDiscussedClick } from './filters.js';

async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderThumbnails(pictures);
    ShowFilter();
    onFilterDefaultClick(pictures);
    onFilterRandomClick(pictures);
    onFilterDiscussedClick(pictures);
  } catch {
    showError();
  }
}

bootstrap();
