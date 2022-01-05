import { Step } from "../reducers/paint";

export const saveStep = ({ method, value, color }: Step) => {
  return {
    type: "SAVE_STEP",
    value,
    method,
    color,
  };
};

export const blankStep = () => {
  return {
    type: "BLANK_STEP",
  };
};

export const setColor = (color: string) => {
  return {
    type: "SET_COLOR",
    color,
  };
};
