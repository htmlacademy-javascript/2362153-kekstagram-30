

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
  textElement.className = 'social__text';
  textElement.textContent = comment.message;

  oneComment.appendChild(avatarOneComment);
  oneComment.appendChild(textOneComment);

  return oneComment;
};
