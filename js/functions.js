/**
 * @param string
 * @param maxLength
 */

// Проверка длины строки

function stringLength(string, maxLength){
  return string.length <= maxLength;
}
stringLength('qwert', 10);

/**
 *
 * @param {*} string
 * @returns
 */

// Проверка, является ли строка палиндромом

function Palindrome(string){
  const stringToCheck = string.replaceAll(' ', '').toLowerCase();
  // метод 1 (более современный)
  // const stringReverse = [...stringToCheck].reverse().join('');

  // метод 2 (согласно заданию академии)
  let stringReverse = '';
  for (let i = stringToCheck.length - 1; i >= 0; i--) {
    stringReverse += stringToCheck[i];
  }

  return stringToCheck === stringReverse;
}
Palindrome('довод');

/**
 *
 * @param {*} chars
 * @returns
 */

//Проверка, есть ли в строке цифры

function isNumber(chars){

  let result = 0;
  const charsString = chars.replaceAll(' ', '');
  const charsToChecked = [...charsString];

  // Перебор каждого символа в строке
  for(let i = 0; i < charsString.length; i++) {
    const digit = parseInt(charsToChecked[i], 10);

    // Проверка, является ли текущий символ цифрой
    if (!isNaN(digit)) {
      result = result * 10 + digit;
    }
  }
  // Проверка наличия результата и его положительности
  return result === 0 ? NaN : Math.abs(result);
}
isNumber('j- jjh67');
