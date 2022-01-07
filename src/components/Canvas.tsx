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
  drawBackground,
  drawLine,
  drawPencil,
  fill,
} from "./functions/drawing";
import drawAllSteps from "./functions/drawAllSteps";
import { Step } from "../store/reducers/paintTypes";

const Canvas = () => {
  const ref = useRef(null);
  const topLayerRef = useRef(null);

  const dispatch = useDispatch();
  const { steps, tool, color, save, undoIndex, thickness } = useSelector(
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

  // Use ref for line thickness
  const thicknessRef = useRef(thickness);
  useEffect(() => {
    thicknessRef.current = thickness;
  }, [thickness]);

  useEffect(() => {
    // Load canvas and resize canvas to fit screen
    const canvas = ref.current! as HTMLCanvasElement;

    // Resize canvas to fit screen
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 170;

    const topCanvas = topLayerRef.current! as HTMLCanvasElement;
    topCanvas.width = window.innerWidth - 20;
    topCanvas.height = window.innerHeight - 170;
  }, []);

  useEffect(() => {
    // Load canvas and rendering context
    const canvas = ref.current! as HTMLCanvasElement;

    // Add white background
    drawBackground(canvas);

    let minLeft: number;
    let minTop: number;
    let newWidth: number;
    let newHeight: number;

    let circleX: number;
    let circleY: number;
    let circleR: number;

    let coordinates: { x: number; y: number }[];

    const topCanvas = topLayerRef.current! as HTMLCanvasElement;
    const topContext = topCanvas.getContext("2d")!;

    const handleMouseDown = (e: MouseEvent) => {
      if (toolRef.current === "fill") {
        return;
      }
      // Get position of canvas on page
      const { left, top } = topCanvas.getBoundingClientRect();

      // Get mouse coordinates relative to canvas
      const startX = e.x - left;
      const startY = e.y - top;

      let currentX: number;
      let currentY: number;

      coordinates = [{ x: startX, y: startY }];

      const handleMouseMove = (e2: MouseEvent) => {
        if (toolRef.current !== "pencil") {
          clearCanvas(topCanvas);
        }

        // Get mouse current position
        currentX = e2.clientX - left;
        currentY = e2.clientY - top;

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

        // Add coordinates of mouse if pencil selected
        if (toolRef.current === "pencil") {
          coordinates.push({ x: currentX, y: currentY });
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
              thicknessRef.current,
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
              thicknessRef.current,
              circleX,
              circleY,
              circleR
            );
            break;
          case "line":
            drawLine(
              topContext,
              colorRef.current,
              thicknessRef.current,
              startX,
              startY,
              currentX,
              currentY
            );
            break;
          case "pencil":
            drawPencil(
              topContext,
              colorRef.current,
              thicknessRef.current,
              coordinates.slice(coordinates.length - 3, coordinates.length)
            );
            break;
          default:
            break;
        }
      };

      const handleMouseUp = (e: MouseEvent) => {
        // Create object of new step from drawing and save to state
        let newStep: Step | undefined;

        if (
          toolRef.current === "rectangle" &&
          minLeft &&
          minTop &&
          newWidth &&
          newHeight
        ) {
          newStep = {
            color: colorRef.current,
            value: {
              type: "rectangle",
              left: minLeft,
              top: minTop,
              width: newWidth,
              height: newHeight,
            },
          };
          dispatch(saveStep(newStep));
        } else if (
          toolRef.current === "rectangleOutline" &&
          minLeft &&
          minTop &&
          newWidth &&
          newHeight
        ) {
          newStep = {
            color: colorRef.current,
            value: {
              type: "rectangleOutline",
              thickness: thicknessRef.current,
              left: minLeft,
              top: minTop,
              width: newWidth,
              height: newHeight,
            },
          };
          dispatch(saveStep(newStep));
        } else if (toolRef.current === "circle" && circleR) {
          newStep = {
            color: colorRef.current,
            value: {
              type: "circle",
              x: circleX,
              y: circleY,
              r: circleR,
            },
          };
          dispatch(saveStep(newStep));
        } else if (toolRef.current === "circleOutline" && circleR) {
          newStep = {
            color: colorRef.current,
            value: {
              type: "circleOutline",
              thickness: thicknessRef.current,
              x: circleX,
              y: circleY,
              r: circleR,
            },
          };
          dispatch(saveStep(newStep));
        } else if (toolRef.current === "line" && currentX && currentY) {
          newStep = {
            color: colorRef.current,
            value: {
              type: "line",
              thickness: thicknessRef.current,
              startX,
              startY,
              endX: currentX,
              endY: currentY,
            },
          };
          dispatch(saveStep(newStep));
        } else if (toolRef.current === "pencil" && coordinates.length > 1) {
          newStep = {
            color: colorRef.current,
            value: {
              type: "pencil",
              thickness: thicknessRef.current,
              coordinates,
            },
          };
          dispatch(saveStep(newStep));
        } else {
          // Add no step but modify so that useEffect runs again
          dispatch(blankStep());
        }

        // Clear top canvas and draw new shape on bottom canvas
        clearCanvas(topCanvas);
        drawAllSteps(canvas, stepsRef.current, newStep);

        // Reset variables
        minLeft = 0;
        minTop = 0;
        newWidth = 0;
        newHeight = 0;
        circleX = 0;
        circleY = 0;
        circleR = 0;
        currentX = 0;
        currentY = 0;
        coordinates = [{ x: 0, y: 0 }];

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
        currentX = 0;
        currentY = 0;
        coordinates = [{ x: 0, y: 0 }];

        topCanvas.removeEventListener("mousemove", handleMouseMove);
        topCanvas.removeEventListener("mouseup", handleMouseUp);
        topCanvas.removeEventListener("mouseleave", handleMouseLeave);
        topCanvas.removeEventListener("mousedown", handleMouseDown);
      };

      topCanvas.addEventListener("mouseleave", handleMouseLeave);

      topCanvas.addEventListener("mouseup", handleMouseUp);
      topCanvas.addEventListener("mousemove", handleMouseMove);
    };

    // Listen for just a click for fill tool
    const handleMouseClick = (e: MouseEvent) => {
      if (toolRef.current !== "fill") {
        return;
      }

      // Get click coordinates
      const { left, top } = canvas.getBoundingClientRect();
      const clickX = e.x - left;
      const clickY = e.y - top;

      fill(canvas, colorRef.current, clickX, clickY);

      dispatch(
        saveStep({
          color: colorRef.current,
          value: {
            type: "fill",
            x: clickX,
            y: clickY,
          },
        })
      );
    };

    // Add mouse down listener when cursor enters canvas
    const handleMouseEnter = () => {
      topCanvas.addEventListener("click", handleMouseClick);
      topCanvas.addEventListener("mousedown", handleMouseDown);
    };

    topCanvas.addEventListener("mouseenter", handleMouseEnter);
  }, [dispatch]);

  // Save drawing as png
  useEffect(() => {
    if (save) {
      const canvas = ref.current! as HTMLCanvasElement;
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "Paint";
      link.href = dataUrl;
      link.click();
      dispatch(toggleSave());
    }
  }, [dispatch, save]);

  // Redraw canvas with different less or more steps when pressing undo/redo
  useEffect(() => {
    const canvas = ref.current! as HTMLCanvasElement;
    clearCanvas(canvas);
    drawBackground(canvas);
    drawAllSteps(canvas, steps.slice(0, steps.length - undoIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [undoIndex]);

  return (
    <React.Fragment>
      <canvas ref={ref} className={classes.canvas}></canvas>
      <canvas ref={topLayerRef} className={classes.topLayer}></canvas>
    </React.Fragment>
  );
};

export default Canvas;
