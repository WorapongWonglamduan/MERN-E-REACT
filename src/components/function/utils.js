import moment from "moment";
import "moment/locale/th"; // Import Thai locale

export const path = process.env.REACT_APP_API;

export const thaiTime = (time) => {
  return moment(time).locale("th").format("ll");
};
export const lastUpdateTime = (time) => {
  return moment(time).locale("th").startOf(time).fromNow();
};

// random images product
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const selectRandomObject = (array) => {
  const shuffledArray = shuffleArray(array);
  const randomIndex = Math.floor(Math.random() * shuffledArray.length);
  return shuffledArray[randomIndex];
};
