import { img } from './scale-img';

const slider = document.querySelector('.img-upload__effect-level');
const list = document.querySelector('.effects__list');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1
});

const toggleClass = (isHidden = false) => {
  slider.classList.toggle('hidden', isHidden);
};

toggleClass(true);

list.addEventListener('change', (evt) => {
  let data = {
    none: '',
    chrome: 'grayscale(1)',
    sepia:'sepia(1)',
    marvin: 'invert(100%)',
    phobos: 'blur(3px)',
    heat: 'brightness(3)',
  };

  const valueTarget = evt.target.value;

  slider.noUiSlider.on('update', () => {
    changeFilter();
  });

  if (valueTarget === 'none') {
    slider.classList('hidden');
  }
  if (valueTarget === 'chrome' || valueTarget === 'sepia') {
    slider.noUiSlider.on('update', () => {
      changeFilter(slider.noUiSlider.get());
    });
  }
  if (valueTarget === 'marvin') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100
    });
    slider.noUiSlider.on('update', () => {
      changeFilter(slider.noUiSlider.get());
    });
  }
  if (valueTarget === 'phobos') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3
    });
    slider.noUiSlider.on('update', () => {
      changeFilter(slider.noUiSlider.get());
    });
  }
  if (valueTarget === 'heat') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3
    });
    slider.noUiSlider.on('update', () => {
      changeFilter(slider.noUiSlider.get());
    });
  }


  function changeFilter(value) {
    data = {
      none: '',
      chrome: `grayscale(${value})`,
      sepia: `sepia(${value})`,
      marvin: `invert(${value}%)`,
      phobos: `blur(${value}px)`,
      heat: `brightness(${value})`,
    };

    img.style.filter = data[valueTarget];
    toggleClass(false);
  }
});
