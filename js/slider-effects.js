import { img } from './scale-img';
import { uploadForm } from './validation';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { EFFECT_OPTION } from './effect-map';

const CHANGE_EVENT = new Event('change');

const sliderLine = document.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');
const sliderEffect = document.querySelector('.img-upload__effect-level');

const slider = noUiSlider.create(sliderLine, EFFECT_OPTION.none.slider);

sliderEffect.hidden = true;

effectList.addEventListener('change', () => {
  const effect = uploadForm.effect.value;

  sliderEffect.hidden = effect === 'none';

  slider.updateOptions(EFFECT_OPTION[effect].slider, false);
});

slider.on('update', () => {
  const value = Number(slider.get());
  uploadForm['effect-level'].value = String(value);

  const currentEffect = uploadForm.effect.value;

  if (currentEffect === 'none') {
    return img.style.removeProperty('filter');
  }

  const filter = EFFECT_OPTION[currentEffect].filter;
  img.style.filter = filter(value);
});

export const resetEffect = () => {
  uploadForm.effect.value = 'none';
  effectList.dispatchEvent(CHANGE_EVENT);
};
