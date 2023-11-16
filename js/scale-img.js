const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP = 25;

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const img = document.querySelector('.img-upload__preview img');

const getValue = () => parseInt(scaleControlValue.value, 10);

const changeImg = (value) => {
  scaleControlValue.setAttribute('value', `${value}%`);
  img.style.transform = `scale(${value / 100})`;
};

const onScaleSmallerClick = () => {
  const value = getValue();
  let nextValue = value - STEP;
  nextValue = (nextValue < MIN_VALUE ? MIN_VALUE : nextValue);

  changeImg(nextValue);
};

const onScaleBiggerClick = () => {
  const value = getValue();
  let nextValue = value + STEP;
  nextValue = (nextValue > MAX_VALUE ? MAX_VALUE : nextValue);

  changeImg(nextValue);
};

scaleSmallerButton.addEventListener('click', onScaleSmallerClick);
scaleBiggerButton.addEventListener('click', onScaleBiggerClick);

export const resetScale = () => img.style.removeProperty('transform');

export { img };
