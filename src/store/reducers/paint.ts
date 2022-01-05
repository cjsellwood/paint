export type Rectangle = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type State = {
  rectangle: Rectangle;
};

const initialState = {
  rectangle: {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  },
};

type Action = {
  type: "SAVE_RECTANGLE";
  rectangle: Rectangle;
};

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case "SAVE_RECTANGLE":
      return { ...state, rectangle: action.rectangle };
    default:
      return state;
  }
};

export default reducer;
