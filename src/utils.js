export const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
export const generateRandomBoolean = () => Math.random() >= 0.5;
export const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];
export const createNumberRange = (limit) => Array.from(new Array(limit), (_, i) => i);
export const generateRandomFixedValue = (min, max) => (Math.random() * (max - min) + min).toFixed(1);

export const createElement = (template, callback = (newElement) => newElement.firstChild) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return callback(newElement);
};
