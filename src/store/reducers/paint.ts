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

export type Step = {
  value: Rectangle | RectangleOutline | Circle | CircleOutline;
  color: string;
};

type State = {
  steps: Step[];
  color: string;
  tool: string;
  save: boolean;
};

const initialState: State = {
  steps: [],
  color: "#000000",
  tool: "rectangle",
  save: false,
};

type Action =
  | {
      type: "SAVE_STEP";
      value: Rectangle | RectangleOutline | Circle | CircleOutline;
      color: string;
    }
  | {
      type: "BLANK_STEP";
    }
  | { type: "SET_COLOR"; color: string }
  | { type: "SET_TOOL"; tool: string }
  | { type: "TOGGLE_SAVE" };

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SAVE_STEP":
      return {
        ...state,
        steps: [...state.steps, { value: action.value, color: action.color }],
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
    default:
      return state;
  }
};

export default reducer;
