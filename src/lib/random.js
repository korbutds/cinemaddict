export const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
export const generateRandomBoolean = () => Math.random() >= 0.5;
export const generateRandomFixedValue = (min, max) => (Math.random() * (max - min) + min).toFixed(1);
export const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];
export const createRandomNumberRange = (limit) => Array.from(new Array(limit), (_, i) => i + 1);

export const generateRandomArray = (array, amount) => array.sort(() => Math.random() - 0.5).slice(0, amount).join(` `);
