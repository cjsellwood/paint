export type Rectangle = {
  type: "rectangle";
  left: number;
  top: number;
  width: number;
  height: number;
};

export type RectangleOutline = {
  type: "rectangleOutline";
  left: number;
  top: number;
  width: number;
  height: number;
};

export type Circle = {
  type: "circle";
  x: number;
  y: number;
  r: number;
};

export type CircleOutline = {
  type: "circleOutline";
  x: number;
  y: number;
  r: number;
};

export type Line = {
  type: "line";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export type Step = {
  value: Rectangle | RectangleOutline | Circle | CircleOutline | Line;
  color: string;
};

type State = {
  steps: Step[];
  color: string;
  tool: string;
  save: boolean;
  undoIndex: number;
};

const initialState: State = {
  steps: [],
  color: "#000000",
  tool: "rectangle",
  save: false,
  undoIndex: 0,
};

type Action =
  | {
      type: "SAVE_STEP";
      value: Rectangle | RectangleOutline | Circle | CircleOutline | Line;
      color: string;
    }
  | {
      type: "BLANK_STEP";
    }
  | { type: "SET_COLOR"; color: string }
  | { type: "SET_TOOL"; tool: string }
  | { type: "TOGGLE_SAVE" }
  | { type: "UNDO" }
  | { type: "REDO" };

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
    default:
      return state;
  }
};

export default reducer;
