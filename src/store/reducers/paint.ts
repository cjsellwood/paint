export type Rectangle = {
  type: "Rectangle";
  left: number;
  top: number;
  width: number;
  height: number;
};

export type Circle = {
  type: "Circle";
  x: number;
  y: number;
  r: number;
};

export type Step = {
  value: Rectangle | Circle;
  color: string;
};

type State = {
  steps: Step[];
  color: string;
  tool: string;
};

const initialState: State = {
  steps: [],
  color: "#000000",
  tool: "Rectangle",
};

type Action =
  | {
      type: "SAVE_STEP";
      value: Rectangle | Circle;
      color: string;
    }
  | {
      type: "BLANK_STEP";
    }
  | { type: "SET_COLOR"; color: string }
  | { type: "SET_TOOL"; tool: string };

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
    default:
      return state;
  }
};

export default reducer;
