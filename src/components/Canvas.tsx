import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Canvas.module.css";
import { saveStep, blankStep } from "../store/actions/paint";
import { RootState } from "../index";

const Canvas = () => {
  const ref = useRef(null);
  const topLayerRef = useRef(null);
  const dispatch = useDispatch();
  const { steps, tool, color } = useSelector((state: RootState) => state.paint);

  // Use ref for colors to pass updated colours to event listeners
  const colorRef = useRef(color);
  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  // Use ref for steps to pass updated steps to event listeners
  const stepsRef = useRef(steps);
  useEffect(() => {
    stepsRef.current = steps;
    console.log(steps);
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
        // Get mouse current position
        const currentX = e2.clientX - left;
        const currentY = e2.clientY - top;

        // Set color from state
        topContext.fillStyle = colorRef.current;
        topContext.clearRect(0, 0, topCanvas.width, topCanvas.height);

        if (toolRef.current === "Rectangle") {
          // Get lowest left coordinate and top coordinate
          minLeft = Math.min(currentX, startX);
          minTop = Math.min(currentY, startY);

          // Calculate width and height of rectangle
          newWidth = Math.abs(startX - currentX);
          newHeight = Math.abs(startY - currentY);
          topContext.fillRect(minLeft, minTop, newWidth, newHeight);
        } else if (toolRef.current === "Circle") {
          circleR = Math.abs(startX - currentX) / 2;
          circleX = Math.min(startX, currentX) + circleR;
          circleY = Math.min(startY, currentY) + circleR;
          topContext.beginPath();
          topContext.arc(circleX, circleY, circleR, 0, 2 * Math.PI, true);
          topContext.fill();
        }
      };

      const handleMouseUp = (e: MouseEvent) => {
        // Save final rectangle to state if one was drawn
        if (
          toolRef.current === "Rectangle" &&
          minLeft &&
          minTop &&
          newWidth &&
          newHeight
        ) {
          dispatch(
            saveStep({
              color: colorRef.current,
              value: {
                type: "Rectangle",
                left: minLeft,
                top: minTop,
                width: newWidth,
                height: newHeight,
              },
            })
          );
        } else if (toolRef.current === "Circle" && circleR) {
          dispatch(
            saveStep({
              color: colorRef.current,
              value: {
                type: "Circle",
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

        // Stop listening to mouse movements and reset dimensions
        topCanvas.removeEventListener("mousemove", handleMouseMove);
        minLeft = 0;
        minTop = 0;
        newWidth = 0;
        newHeight = 0;
        circleX = 0;
        circleY = 0;
        circleR = 0;

        // Clear canvas and redraw from steps saved in state
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let step of stepsRef.current) {
          if (step.value.type === "Rectangle") {
            context.fillStyle = step.color;
            context.fillRect(
              step.value.left,
              step.value.top,
              step.value.width,
              step.value.height
            );
          } else if (step.value.type === "Circle") {
            console.log(step);
            context.fillStyle = step.color;
            context.beginPath();
            context.arc(
              step.value.x,
              step.value.y,
              step.value.r,
              0,
              2 * Math.PI,
              true
            );
            context.fill();
          }
        }

        // Add newest drawing to bottom canvas
        context.fillStyle = colorRef.current;

        if (toolRef.current === "Rectangle") {
          context.fillRect(minLeft, minTop, newWidth, newHeight);
        } else if (toolRef.current === "Circle") {
          context.beginPath();
          context.arc(circleX, circleY, circleR, 0, 2 * Math.PI, true);
          context.fill();
        }
        topCanvas.removeEventListener("mouseup", handleMouseUp);
        topCanvas.removeEventListener("mouseleave", handleMouseLeave);
      };

      // If mouse leaves canvas cancel drawing and reset canvas
      const handleMouseLeave = (e: MouseEvent) => {
        topContext.clearRect(0, 0, topCanvas.width, topCanvas.height);
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

  return (
    <React.Fragment>
      <canvas ref={ref} className={classes.canvas}></canvas>
      <canvas ref={topLayerRef} className={classes.topLayer}></canvas>
    </React.Fragment>
  );
};

export default Canvas;
