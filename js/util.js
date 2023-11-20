const REMOVE_MESSAGE_TIMEOUT = 4000;

export const getTemplate = (templateId) => {
  const template = document.querySelector(`#${templateId}`).content.firstElementChild;
  return template.cloneNode(true);
};

const errorMessage = getTemplate('data-error');

export const showError = () => {
  const error = errorMessage.cloneNode(true);
  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

export const renderFew = (items, container, markUp) => {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const element = markUp(item);
    fragment.appendChild(element);
  });

  container.appendChild(fragment);
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const onKeyDownEscape = (evt) => evt.key === 'Escape';

export { onKeyDownEscape };
