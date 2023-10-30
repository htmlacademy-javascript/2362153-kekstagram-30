import {renderThumbnails} from './thumbnails.js'
import { getPictures } from './mock.js';

const closeFullPicture = (evt, closePhoto) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closePhoto.classList.add('hidden');
  }
};
