/**
 *  Проверка длины строки
 * @param string
 * @param maxLength
 */

const isStringLength = (string, maxLength) => (string.length <= maxLength);
isStringLength('qwert', 10);

/**
 *Проверка, является ли строка палиндромом
 * @param {string} string
 */

// метод 1 (более современный)
const isPalindrome1 = (string) => {
  const stringToCheck = string.replaceAll(' ', '').toLowerCase();

  const stringReverse = [...stringToCheck].reverse().join('');
  return stringToCheck === stringReverse;
};

// метод 2 (согласно заданию академии)
const isPalindrome2 = (string) => {
  const stringToCheck = string.replaceAll(' ', '').toLowerCase();
  let stringReverse = '';
  for (let i = stringToCheck.length - 1; i >= 0; i--) {
    stringReverse += stringToCheck[i];
  }
  return stringToCheck === stringReverse;
};

// Метод 3 (из лайва)
const isPalindrome3 = (string) => {
  const stringToCheck = string.replaceAll(' ', '').toLowerCase();
  const halfString = stringToCheck.length / 2;

  for (let i = 0; i < halfString; i++) {
    const firstChar = stringToCheck.at(i);
    const lastChar = stringToCheck.at(-i - 1);
    if(firstChar !== lastChar) {
      return false;
    }
  }

  return true;
};

isPalindrome1('довод');
isPalindrome2('А роза упала на лапу АЗора');
isPalindrome3('день рождения');

/**
 *Проверка, есть ли в строке цифры
 * @param {*} chars
 */

// Метод 1
const isNumber1 = (chars) => {
  let result1 = '';
  const string = chars.toString();

  for(let i = 0; i < string.length; i++) {
    const char = parseInt(string[i], 10);

    if(!Number.isNaN(char)){
      result1 += string[i];
    }
  }
  return result1;
};

// Метод 2
const isNumber2 = (chars) => {

  let result2 = 0;
  const charsString = chars.replaceAll(' ', '');
  const charsToChecked = [...charsString];

  // Перебор каждого символа в строке
  for(let i = 0; i < charsString.length; i++) {
    const digit = parseInt(charsToChecked[i], 10);

    // Проверка, является ли текущий символ цифрой
    if (!isNaN(digit)) {
      result2 = result2 * 10 + digit;
    }
  }
  // Проверка наличия результата и его положительности
  return result2 === 0 ? NaN : Math.abs(result2);
};

isNumber1('10october');
isNumber2('10-10-1992');
