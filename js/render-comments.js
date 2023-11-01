const bigPicture = document.querySelector('.big-picture');

/**
 *
 * @param {HTMLAnchorElement} comment
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

// добавление комментариев

const commentLoader = bigPicture.querySelector('.social__comments-loader');
const allComments = bigPicture.querySelector('.social__comments');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
/**
 *
 * @param {Array} comments
 */

  const addComments = (comments) => {
    let newComments = comments;

    return () => {
      if (newComments.length <= 5) {
        commentLoader.classList.add('hidden');
      }
      else if (newComments.length > 5) {
        commentLoader.classList.remove('hidden');
      }

        newComments.slice(0, 5).forEach((comment) => {
          const newCommentElement = createComment(comment);
          allComments.appendChild(newCommentElement);
        });
        newComments = newComments.slice(5);

        commentShownCount.textContent = bigPicture.querySelectorAll('.social__comment').length.toString();
    };
  };

  const renderComments = (comments) => {
    const commentLoader = bigPicture.querySelector('.social__comments-loader');
    commentTotalCount.textContent = comments.length.toString();
    allComments.innerHTML = '';

    const addNewComment = addComments(comments);
    commentLoader.classList.remove('hidden');
    addNewComment();

    commentLoader.addEventListener('click', addNewComment);
  };

export { renderComments, bigPicture };
