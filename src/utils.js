'use strict';

/**
 * Перетасовка массива по алгоритму
 * Фишера—Йетса.
 *
 * Функция возвращает новый массив
 *
 * @param {Array} array
 * @return {Array}
 */
const shuffle = (array) => {
  const resultArray = array.slice();
  for (let i = resultArray.length - 1; i > 0; i--) {
    const randomNumber = Math.floor(Math.random() * (i + 1));
    [resultArray[randomNumber], resultArray[i]] = [resultArray[i], resultArray[randomNumber]];
  }

  return resultArray;
};

/**
 * Возвращает случайное число в диапазоне
 * `min` и `max`.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArray = (oldArray) => {
  let newArray = [];

  oldArray.forEach((item) => {
    if (Math.round(Math.random())) {
      return newArray.push(item);
    }

    return null;
  });

  if (newArray.length === 0) {
    newArray = oldArray[getRandomInt(0, oldArray.length - 1)];
  }

  return newArray;
};

const HTTP_CODE = {
  success: 200,
  notFound: 404,
};

module.exports = {
  shuffle,
  getRandomInt,
  getRandomArray,
  HTTP_CODE,
};
