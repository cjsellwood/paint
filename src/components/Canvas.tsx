import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Canvas.module.css";
import { saveStep, blankStep, toggleSave } from "../store/actions/paint";
import { RootState } from "../index";
import {
  drawRectangle,
  drawRectangleOutline,
  drawCircle,
  drawCircleOutline,
  clearCanvas,
} from "./functions/drawing";

const Canvas = () => {
  const ref = useRef(null);
  const topLayerRef = useRef(null);
  const dispatch = useDispatch();
  const { steps, tool, color, save } = useSelector(
    (state: RootState) => state.paint
  );

  // Use ref for colors to pass updated colours to event listeners
  const colorRef = useRef(color);
  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  // Use ref for steps to pass updated steps to event listeners
  const stepsRef = useRef(steps);
  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  // Use ref for tool to pass updated tool selection to event listeners
  const toolRef = useRef(tool);
  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  useEffect(() => {
    // Load canvas and resize canvas to fit screen
    let canvas = ref.current! as HTMLCanvasElement;

    // Resize canvas to fit screen
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 170;

    let topCanvas = topLayerRef.current! as HTMLCanvasElement;
    topCanvas.width = window.innerWidth - 20;
    topCanvas.height = window.innerHeight - 170;
  }, []);

  useEffect(() => {
    // Load canvas and rendering context
    let canvas = ref.current! as HTMLCanvasElement;
    const context = canvas.getContext("2d")!;

    let minLeft: number;
    let minTop: number;
    let newWidth: number;
    let newHeight: number;

    let circleX: number;
    let circleY: number;
    let circleR: number;

    let topCanvas = topLayerRef.current! as HTMLCanvasElement;
    const topContext = topCanvas.getContext("2d")!;

    const handleMouseDown = (e: MouseEvent) => {
      // Get position of canvas on page
      const { left, top } = topCanvas.getBoundingClientRect();

      // Get mouse coordinates relative to canvas
      const startX = e.x - left;
      const startY = e.y - top;

      const handleMouseMove = (e2: MouseEvent) => {
        clearCanvas(topCanvas);

        // Get mouse current position
        const currentX = e2.clientX - left;
        const currentY = e2.clientY - top;

        // Calculate necessary variables for rectangles
        if (
          toolRef.current === "rectangle" ||
          toolRef.current === "rectangleOutline"
        ) {
          // Get lowest left coordinate and top coordinate
          minLeft = Math.min(currentX, startX);
          minTop = Math.min(currentY, startY);

          // Calculate width and height of rectangle
          newWidth = Math.abs(startX - currentX);
          newHeight = Math.abs(startY - currentY);
        }

        // Calculate radius of circle and centerpoint
        if (
          toolRef.current === "circle" ||
          toolRef.current === "circleOutline"
        ) {
          circleR =
            Math.max(Math.abs(startX - currentX), Math.abs(startY - currentY)) /
            2;
          circleX =
            Math.min(startX, currentX) + Math.abs(startX - currentX) / 2;
          circleY =
            Math.min(startY, currentY) + Math.abs(startY - currentY) / 2;
        }

        switch (toolRef.current) {
          case "rectangle":
            drawRectangle(
              topContext,
              colorRef.current,
              minLeft,
              minTop,
              newWidth,
              newHeight
            );
            break;
          case "rectangleOutline":
            drawRectangleOutline(
              topContext,
              colorRef.current,
              minLeft,
              minTop,
              newWidth,
              newHeight
            );
            break;
          case "circle":
            drawCircle(topContext, colorRef.current, circleX, circleY, circleR);
            break;
          case "circleOutline":
            drawCircleOutline(
              topContext,
              colorRef.current,
              circleX,
              circleY,
              circleR
            );
            break;
          default:
            break;
        }
      };

      const handleMouseUp = (e: MouseEvent) => {
        // Save final shape to state if one was drawn
        if (
          toolRef.current === "rectangle" &&
          minLeft &&
          minTop &&
          newWidth &&
          newHeight
        ) {
          dispatch(
            saveStep({
              color: colorRef.current,
              value: {
                type: "rectangle",
                left: minLeft,
                top: minTop,
                width: newWidth,
                height: newHeight,
              },
            })
          );
        } else if (
          toolRef.current === "rectangleOutline" &&
          minLeft &&
          minTop &&
          newWidth &&
          newHeight
        ) {
          dispatch(
            saveStep({
              color: colorRef.current,
              value: {
                type: "rectangleOutline",
                left: minLeft,
                top: minTop,
                width: newWidth,
                height: newHeight,
              },
            })
          );
        } else if (toolRef.current === "circle" && circleR) {
          dispatch(
            saveStep({
              color: colorRef.current,
              value: {
                type: "circle",
                x: circleX,
                y: circleY,
                r: circleR,
              },
            })
          );
        } else if (toolRef.current === "circleOutline" && circleR) {
          dispatch(
            saveStep({
              color: colorRef.current,
              value: {
                type: "circleOutline",
                x: circleX,
                y: circleY,
                r: circleR,
              },
            })
          );
        } else {
          // Add no step but modify so that useEffect runs again
          dispatch(blankStep());
        }

        // Clear canvas and redraw from steps saved in state
        clearCanvas(canvas);
        for (let step of stepsRef.current) {
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
              step.value.left,
              step.value.top,
              step.value.width,
              step.value.height
            );
          } else if (step.value.type === "circle") {
            drawCircle(
              context,
              step.color,
              step.value.x,
              step.value.y,
              step.value.r
            );
          } else if (step.value.type === "circleOutline") {
            drawCircleOutline(
              context,
              step.color,
              step.value.x,
              step.value.y,
              step.value.r
            );
          }
        }

        // Add newest drawing to bottom canvas
        if (toolRef.current === "rectangle") {
          drawRectangle(
            context,
            colorRef.current,
            minLeft,
            minTop,
            newWidth,
            newHeight
          );
        } else if (toolRef.current === "rectangleOutline") {
          drawRectangleOutline(
            context,
            colorRef.current,
            minLeft,
            minTop,
            newWidth,
            newHeight
          );
        } else if (toolRef.current === "circle") {
          drawCircle(context, colorRef.current, circleX, circleY, circleR);
        } else if (toolRef.current === "circleOutline") {
          drawCircleOutline(
            context,
            colorRef.current,
            circleX,
            circleY,
            circleR
          );
        }

        // Reset variables
        minLeft = 0;
        minTop = 0;
        newWidth = 0;
        newHeight = 0;
        circleX = 0;
        circleY = 0;
        circleR = 0;

        // Stop listening to mouse movements
        topCanvas.removeEventListener("mousemove", handleMouseMove);
        topCanvas.removeEventListener("mouseup", handleMouseUp);
        topCanvas.removeEventListener("mouseleave", handleMouseLeave);
      };

      // If mouse leaves canvas cancel drawing and reset canvas
      const handleMouseLeave = () => {
        clearCanvas(topCanvas);

        minLeft = 0;
        minTop = 0;
        newWidth = 0;
        newHeight = 0;
        circleX = 0;
        circleY = 0;
        circleR = 0;

        topCanvas.removeEventListener("mousemove", handleMouseMove);
        topCanvas.removeEventListener("mouseup", handleMouseUp);
        topCanvas.removeEventListener("mouseleave", handleMouseLeave);
        topCanvas.removeEventListener("mousedown", handleMouseDown);
      };

      topCanvas.addEventListener("mouseleave", handleMouseLeave);

      topCanvas.addEventListener("mouseup", handleMouseUp);
      topCanvas.addEventListener("mousemove", handleMouseMove);
    };

    // Add mouse down listener when cursor enters canvas
    const handleMouseEnter = () => {
      topCanvas.addEventListener("mousedown", handleMouseDown);
    };

    topCanvas.addEventListener("mouseenter", handleMouseEnter);
  }, [dispatch]);

  useEffect(() => {
    if (save) {
      let canvas = ref.current! as HTMLCanvasElement;
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "Paint";
      link.href = dataUrl;
      link.click();
      dispatch(toggleSave());
    }
  }, [dispatch, save]);

  return (
    <React.Fragment>
      <canvas ref={ref} className={classes.canvas}></canvas>
      <canvas ref={topLayerRef} className={classes.topLayer}></canvas>
    </React.Fragment>
  );
};

export default Canvas;
