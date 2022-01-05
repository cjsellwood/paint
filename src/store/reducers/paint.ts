export type Rectangle = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type Step = {
  method: string;
  value: Rectangle;
  color: string;
};

type State = {
  steps: Step[];
  color: string;
};

const initialState: State = {
  steps: [],
  color: "#000000",
};

type Action =
  | {
      type: "SAVE_STEP";
      value: Rectangle;
      method: string;
      color: string;
    }
  | {
      type: "BLANK_STEP";
    }
  | { type: "SET_COLOR"; color: string };

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SAVE_STEP":
      return {
        ...state,
        steps: [
          ...state.steps,
          { method: action.method, value: action.value, color: action.color },
        ],
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
    default:
      return state;
  }
};

export default reducer;
