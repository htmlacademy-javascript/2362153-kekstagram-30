const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP = 25;

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const img = document.querySelector('.img-upload__preview img');

const getValue = () => Number(scaleControlValue.getAttribute('value').slice(0, -1));

const changeImg = (value) => {
  scaleControlValue.setAttribute('value', `${value}%`);
  img.style.transform = `scale(${value / 100})`;
};

const onScaleSmallerClick = () => {
  const value = getValue();

  if (value - STEP <= MIN_VALUE) {
    changeImg(MIN_VALUE);
  } else {
    changeImg(value - STEP);
  }
};

const onScaleBiggerClick = () => {
  const value = getValue();

  if (value + STEP >= MAX_VALUE) {
    changeImg(MAX_VALUE);
  } else {
    changeImg(value + STEP);
  }
};

scaleSmallerButton.addEventListener('click', onScaleSmallerClick);
scaleBiggerButton.addEventListener('click', onScaleBiggerClick);

export { img };
