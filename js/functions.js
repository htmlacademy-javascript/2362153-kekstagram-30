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

const isPalindrome = (string) => {
  const stringToCheck = string.replaceAll(' ', '').toLowerCase();
  // метод 1 (более современный)
  // const stringReverse = [...stringToCheck].reverse().join('');

  // метод 2 (согласно заданию академии)
  let stringReverse = '';
  for (let i = stringToCheck.length - 1; i >= 0; i--) {
    stringReverse += stringToCheck[i];
  }

  return stringToCheck === stringReverse;
};

isPalindrome('довод');

/**
 *Проверка, есть ли в строке цифры
 * @param {*} chars
 */

const isNumber = (chars) => {
  // Метод 1
  let result1 = '';
  const string = chars.toString();

  for(let i = 0; i < string.length; i++) {
    const char = parseInt(string[i], 10);

    if(!Number.isNaN(char)){
      result1 += string[i];
    }
  }
  return result1;


  // // Метод 2
  // let result2 = 0;
  // const charsString = chars.replaceAll(' ', '');
  // const charsToChecked = [...charsString];

  // // Перебор каждого символа в строке
  // for(let i = 0; i < charsString.length; i++) {
  //   const digit = parseInt(charsToChecked[i], 10);

  //   // Проверка, является ли текущий символ цифрой
  //   if (!isNaN(digit)) {
  //     result2 = result2 * 10 + digit;
  //   }
  // }
  // // Проверка наличия результата и его положительности
  // return result2 === 0 ? NaN : Math.abs(result2);
};

isNumber('545ertert');
