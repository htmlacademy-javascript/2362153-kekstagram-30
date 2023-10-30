const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, getRandomArrayElement};

/**
 *
 * @param {string} templateId
 */

export const getTemplate = (templateId) => {
  const template = document.querySelector(`#${templateId}`)?.content.firstElementChild;
  return template.cloneNode(true);
};

/**
 *
 * @param {Array} items
 * @param {HTMLElement} container
 * @param {(any) => HTMLElement} markUp
 */
export const renderFew = (items, container, markUp) => {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const element = markUp(item);
    fragment.appendChild(element);
  });

  container.appendChild(fragment);
};
