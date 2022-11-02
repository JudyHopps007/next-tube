export const shuffle = (array: any[], seed: string = 'defaultSeed') => {
  var seedrandom = require('seedrandom');
  var rng = seedrandom(seed);
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(rng() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const getRandomNumber = (
  min: number,
  max: number,
  seed: string = 'defaultSeed'
) => {
  var seedrandom = require('seedrandom');
  var rng = seedrandom(seed);
  return Math.floor(rng() * (max - min + 1) + min);
};

export const getRandomElements = (
  array: any[],
  amount: number,
  seed: string = 'defaultSeed'
) => {
  let n = amount;
  if (n > array.length) n = array.length;
  return shuffle(array, seed).slice(0, amount);
};
