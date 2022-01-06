import { State, Action } from "./paintTypes";

const initialState: State = {
  steps: [],
  color: "#000000",
  tool: "rectangle",
  save: false,
  undoIndex: 0,
  thickness: 1,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SAVE_STEP":
      let steps = state.steps;
      if (state.undoIndex !== 0) {
        steps = [...steps].slice(0, steps.length - state.undoIndex);
      }
      return {
        ...state,
        steps: [...steps, { value: action.value, color: action.color }],
        undoIndex: 0,
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
    default:
      return state;
  }
};

export default reducer;
