import moment from "moment";
import "moment/locale/th"; // Import Thai locale

export const path = process.env.REACT_APP_API;

export const thaiTime = (time) => {
  return moment(time).locale("th").format("ll");
};
export const lastUpdateTime = (time) => {
  return moment(time).locale("th").startOf(time).fromNow();
};
