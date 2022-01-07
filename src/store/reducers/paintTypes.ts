export type Rectangle = {
  type: "rectangle";
  left: number;
  top: number;
  width: number;
  height: number;
};

export type RectangleOutline = {
  type: "rectangleOutline";
  thickness: number;
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
  thickness: number;
  x: number;
  y: number;
  r: number;
};

export type Line = {
  type: "line";
  thickness: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export type Pencil = {
  type: "pencil";
  thickness: number;
  coordinates: { x: number; y: number }[];
};

export type Fill = {
  type: "fill";
  x: number;
  y: number;
};

export type Step = {
  value:
    | Rectangle
    | RectangleOutline
    | Circle
    | CircleOutline
    | Line
    | Pencil
    | Fill;
  color: string;
};

export type State = {
  steps: Step[];
  color: string;
  tool: string;
  save: boolean;
  undoIndex: number;
  thickness: number;
};

export type Action =
  | {
      type: "SAVE_STEP";
      value:
        | Rectangle
        | RectangleOutline
        | Circle
        | CircleOutline
        | Line
        | Pencil
        | Fill;
      color: string;
    }
  | {
      type: "BLANK_STEP";
    }
  | { type: "SET_COLOR"; color: string }
  | { type: "SET_TOOL"; tool: string }
  | { type: "TOGGLE_SAVE" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET_THICKNESS"; thickness: number };
