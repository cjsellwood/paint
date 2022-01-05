import { Rectangle } from "../reducers/paint";

export const saveRectangle = (rectangle: Rectangle) => {
  return {
    type: "SAVE_RECTANGLE",
    rectangle,
  };
};
