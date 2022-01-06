import {
  drawRectangle,
  drawRectangleOutline,
  drawCircle,
  drawCircleOutline,
  drawLine,
  drawPencil,
} from "./drawing";
import { Step } from "../../store/reducers/paintTypes";

const drawAllSteps = (
  context: CanvasRenderingContext2D,
  steps: Step[],
  newStep?: Step
) => {
  // Add newly drawn step if added
  if (typeof newStep !== "undefined") {
    steps.push(newStep);
  }

  for (let step of steps) {
    if (step.value.type === "rectangle") {
      drawRectangle(
        context,
        step.color,
        step.value.left,
        step.value.top,
        step.value.width,
        step.value.height
      );
    } else if (step.value.type === "rectangleOutline") {
      drawRectangleOutline(
        context,
        step.color,
        step.value.thickness,
        step.value.left,
        step.value.top,
        step.value.width,
        step.value.height
      );
    } else if (step.value.type === "circle") {
      drawCircle(context, step.color, step.value.x, step.value.y, step.value.r);
    } else if (step.value.type === "circleOutline") {
      drawCircleOutline(
        context,
        step.color,
        step.value.thickness,
        step.value.x,
        step.value.y,
        step.value.r
      );
    } else if (step.value.type === "line") {
      drawLine(
        context,
        step.color,
        step.value.thickness,
        step.value.startX,
        step.value.startY,
        step.value.endX,
        step.value.endY
      );
    } else if (step.value.type === "pencil") {
      drawPencil(
        context,
        step.color,
        step.value.thickness,
        step.value.coordinates
      );
    }
  }
};

export default drawAllSteps;
