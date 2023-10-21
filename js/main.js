const defaults = {
  PICTURE_COUNT: 25,
  AVATAR_COUNT: 6,
  LIKE_MIN_COUNT: 5,
  LIKE_MAX_COUNT: 200,
  COMMENT_COUNT: 20
};

const NAMES = [
  'Mary',
  'Leo',
  'Mark',
  'Sherlock',
  'Chak',
  'Chucha'
];

const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  '#spb #круто #осень2023',
  'семейные ценности #семья #фэмили',
  'Как же круто #любовь #семья #отпуск #отдых',
  'Отдыхаем... #любовь #семья #отпуск #отдых',
  'Работа - это жизнь! #работа #js #javascript',
  'А сейчас немного о жизни... #дом #интерьер #уют #жизнь',
  'Любовь. #любовь #2023 #тай #самолет'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGenerateId = 0;

  return () => {
    lastGenerateId += 1;
    return lastGenerateId;
  };
};

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from (
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(COMMENT_LINES)
).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, defaults.AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const generatePhotoId = createIdGenerator();

const createPicture = (index) => ({
  id: generatePhotoId(),
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(defaults.LIKE_MIN_COUNT, defaults.LIKE_MAX_COUNT),
  comments: Array.from (
    { length: getRandomInteger(0, defaults.COMMENT_COUNT) },
    createComment
  )
});

const getPictures = () => Array.from(
  { length: defaults.PICTURE_COUNT },
  (_, pictureIndex) => createPicture(pictureIndex + 1)
);

getPictures();
