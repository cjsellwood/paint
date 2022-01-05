import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Canvas.module.css";
import { saveStep, blankStep } from "../store/actions/paint";
import { RootState } from "../index";

const Canvas = () => {
  const ref = useRef(null);
  const topLayerRef = useRef(null);
  const dispatch = useDispatch();
  const steps = useSelector((state: RootState) => state.paint.steps);
  const stateColor = useSelector((state: RootState) => state.paint.color);

  // Use ref for colors to pass updated colours to event listeners
  const colorRef = useRef(stateColor);
  useEffect(() => {
    colorRef.current = stateColor;
  }, [stateColor]);

  const stepsRef = useRef(steps);
  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

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

    let topCanvas = topLayerRef.current! as HTMLCanvasElement;
    const topContext = topCanvas.getContext("2d")!;

    const handleMouseHold = (e: MouseEvent) => {
      // Get position of canvas on page
      const { left, top } = topCanvas.getBoundingClientRect();

      // Get mouse coordinates relative to canvas
      const startX = e.x - left;
      const startY = e.y - top;

      const handleMouseMove = (e2: MouseEvent) => {
        // Get mouse current position
        const currentX = e2.clientX - left;
        const currentY = e2.clientY - top;

        // Get lowest left coordinate and top coordinate
        minLeft = Math.min(currentX, startX);
        minTop = Math.min(currentY, startY);

        // Calculate width and height of rectangle
        newWidth = Math.abs(startX - currentX);
        newHeight = Math.abs(startY - currentY);

        // Set color from state
        topContext.fillStyle = colorRef.current;

        topContext.clearRect(0, 0, topCanvas.width, topCanvas.height);

        topContext.fillRect(minLeft, minTop, newWidth, newHeight);
      };

      const handleMouseUp = () => {
        // Save final rectangle to state if one was drawn
        if (minLeft && minTop && newWidth && newHeight) {
          dispatch(
            saveStep({
              method: "fillRect",
              color: colorRef.current,
              value: {
                left: minLeft,
                top: minTop,
                width: newWidth,
                height: newHeight,
              },
            })
          );
        } else {
          // Else add no step but modify so that useEffect runs again
          dispatch(blankStep());
        }
        topCanvas.removeEventListener("mousemove", handleMouseMove);

        // Clear canvas and redraw from steps saved in state
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let step of stepsRef.current) {
          if (step.method === "fillRect") {
            context.fillStyle = step.color;
            context.fillRect(
              step.value.left,
              step.value.top,
              step.value.width,
              step.value.height
            );
          }
        }

        // Add newest drawing to bottom canvas
        context.fillStyle = colorRef.current;

        context.fillRect(minLeft, minTop, newWidth, newHeight);
        topCanvas.removeEventListener("mouseup", handleMouseUp);
      };

      topCanvas.addEventListener("mouseup", handleMouseUp);
      topCanvas.addEventListener("mousemove", handleMouseMove);
    };

    // Add event listener for holding mouse down
    topCanvas.addEventListener("mousedown", handleMouseHold);
  }, [dispatch]);

  return (
    <React.Fragment>
      <canvas ref={ref} className={classes.canvas}></canvas>
      <canvas ref={topLayerRef} className={classes.topLayer}></canvas>
    </React.Fragment>
  );
};

export default Canvas;
