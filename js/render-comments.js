import { renderFew } from './util';

const PACK_SIZE = 5;

const bigPicture = document.querySelector('.big-picture');
const loaderButton = bigPicture.querySelector('.social__comments-loader');
const list = bigPicture.querySelector('.social__comments');
const shownCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCount = bigPicture.querySelector('.social__comment-total-count');
let allComments = [];

/**
 *
 * @param {Object} comment
 */

const createComment = (comment) => {
  const oneComment = document.createElement('li');
  oneComment.className = 'social__comment';

  const avatarOneComment = document.createElement('img');
  avatarOneComment.className = 'social__picture';
  avatarOneComment.src = comment.avatar;
  avatarOneComment.alt = comment.name;
  avatarOneComment.width = 35;
  avatarOneComment.height = 35;

  const textOneComment = document.createElement('p');
  textOneComment.className = 'social__text';
  textOneComment.textContent = comment.message;

  oneComment.appendChild(avatarOneComment);
  oneComment.appendChild(textOneComment);

  return oneComment;
};

const addNextComments = () => {
  const currentShowedAmount = list.childElementCount;
  let nextShowedAmount = currentShowedAmount + PACK_SIZE;

  const isAllWillBeShown = nextShowedAmount >= allComments.length;
  nextShowedAmount = isAllWillBeShown ? allComments.length : nextShowedAmount;
  const showComments = allComments.slice(currentShowedAmount, nextShowedAmount);

  renderFew(showComments, list, createComment);

  shownCount.textContent = nextShowedAmount.toString();

  loaderButton.classList.toggle('hidden', nextShowedAmount >= allComments.length);
};

loaderButton.addEventListener('click', addNextComments);

/**
 *
 * @param {Array} comments
 */

const renderComments = (comments) => {
  allComments = comments;
  totalCount.textContent = comments.length.toString();
  list.innerHTML = '';
  addNextComments();
};

export { renderComments, bigPicture };
