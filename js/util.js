/**
 *
 * @param {string} templateId
 */

export const getTemplate = (templateId) => {
  const template = document.querySelector(`#${templateId}`).content.firstElementChild;
  return template.cloneNode(true);
};

/**
 *
 * @param {Array} items
 * @param {HTMLElement} container
 * @param {() => HTMLElement} markUp
 */
export const renderFew = (items, container, markUp) => {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const element = markUp(item);
    fragment.appendChild(element);
  });

  container.appendChild(fragment);
};

const REMOVE_MESSAGE_TIMEOUT = 4000;
const errorMessage = document.querySelector('#data-error').content.querySelector('.data-error');

function showError() {
  const error = errorMessage.cloneNode(true);
  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
}

export { showError };
