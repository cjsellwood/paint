import { Step } from "../reducers/paintTypes";

export const saveStep = ({ value, color }: Step) => {
  return {
    type: "SAVE_STEP",
    value,
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

export const setTool = (tool: string) => {
  return {
    type: "SET_TOOL",
    tool,
  };
};

export const toggleSave = () => {
  return {
    type: "TOGGLE_SAVE",
  };
};

export const undo = () => {
  return {
    type: "UNDO",
  };
};

export const redo = () => {
  return {
    type: "REDO",
  };
};

export const setThickness = (thickness: number) => {
  return {
    type: "SET_THICKNESS",
    thickness,
  };
};

export const toggleClear = () => {
  return {
    type: "TOGGLE_CLEAR",
  };
};

export const clearSteps = () => {
  return {
    type: "CLEAR_STEPS",
  };
};
