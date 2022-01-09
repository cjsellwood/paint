import { State, Action } from "./paintTypes";

const initialState: State = {
  steps: [],
  color: "#000000",
  tool: "pencil",
  save: false,
  undoIndex: 0,
  thickness: 1,
  clearDrawing: false,
  defaultColors: [
    "#ff0000",
    "#ffa500",
    "#ffff00",
    "#008000",
    "#0000ff",
    "#800080",
    "#000000",
    "#ffffff",
    "#8b4513",
    "#ffc0cb",
    "#00ffff",
    "#00ff00",
    "#00bfff",
    "#ee82ee",
    "#696969",
    "#d3d3d3",
  ],
  customColors: [
    "#999999",
    "#999999",
    "#999999",
    "#999999",
    "#999999",
    "#999999",
    "#999999",
    "#999999",
  ],
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SAVE_STEP":
      let steps = state.steps;
      if (state.undoIndex !== 0) {
        steps = [...steps].slice(0, steps.length - state.undoIndex);
      }
      let customColors = state.customColors;
      if (
        !state.defaultColors.includes(action.color) &&
        !state.customColors.includes(action.color)
      ) {
        customColors = [action.color, ...state.customColors];
        customColors.pop();
      }
      return {
        ...state,
        steps: [...steps, { value: action.value, color: action.color }],
        undoIndex: 0,
        customColors,
      };
    case "BLANK_STEP":
      return {
        ...state,
        steps: [...state.steps],
      };
    case "SET_COLOR":
      return {
        ...state,
        color: action.color,
      };
    case "SET_TOOL":
      return {
        ...state,
        tool: action.tool,
      };
    case "TOGGLE_SAVE":
      return {
        ...state,
        save: !state.save,
      };
    case "UNDO":
      if (state.undoIndex + 1 > state.steps.length) {
        return state;
      }
      return {
        ...state,
        undoIndex: state.undoIndex + 1,
      };
    case "REDO":
      if (state.undoIndex - 1 < 0) {
        return state;
      }
      return {
        ...state,
        undoIndex: state.undoIndex - 1,
      };
    case "SET_THICKNESS":
      return {
        ...state,
        thickness: action.thickness,
      };
    case "TOGGLE_CLEAR":
      return {
        ...state,
        clearDrawing: !state.clearDrawing,
      };
    case "CLEAR_STEPS":
      return {
        ...state,
        steps: [],
        undoIndex: 0,
      };
    default:
      return state;
  }
};

export default reducer;
