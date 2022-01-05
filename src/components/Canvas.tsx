import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Canvas.module.css";
import { saveRectangle } from "../store/actions/paint";
import { RootState } from "../index";

const Canvas = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load canvas and rendering context
    let canvas = ref.current! as HTMLCanvasElement;
    const context = canvas.getContext("2d")!;

    // Resize canvas to fit screen
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 170;

    // Draw rectangles
    context.fillStyle = "rgb(200, 0, 0)";
    context.fillRect(10, 10, 50, 50);
    context.fillStyle = "rgba(0, 0, 200, 0.5)";
    context.fillRect(30, 30, 50, 50);
    context.strokeStyle = "rgb(0, 160, 0)";
    context.strokeRect(100, 100, 50, 50);

    canvas.addEventListener("mousedown", (e) => {
      console.log(e);
      // Get position of canvas on page
      const { left, top } = canvas.getBoundingClientRect();

      // Get mouse coordinates relative to canvas
      const startX = e.x - left;
      const startY = e.y - top;

      let rectangle = { left: 0, top: 0, width: 0, height: 0 };

      const handleMouseMove = (e2: MouseEvent) => {
        // Clear previous rectangle
        // console.log(stateRectangle);
        // context.clearRect(
        //   stateRectangle.left,
        //   stateRectangle.top,
        //   stateRectangle.width,
        //   stateRectangle.height
        // );

        // Get mouse current position
        const currentX = e2.clientX - left;
        const currentY = e2.clientY - top;

        // Get lowest left coordinate and top coordinate
        const minLeft = Math.min(currentX, startX);
        const minTop = Math.min(currentY, startY);

        // Calculate width and height of rectangle
        const newWidth = Math.abs(startX - currentX);
        const newHeight = Math.abs(startY - currentY);

        // Save rectangle to state and draw new rectangle
        // dispatch(
        //   saveRectangle({
        //     left: minLeft,
        //     top: minTop,
        //     width: newWidth,
        //     height: newHeight,
        //   })
        // );

        context.clearRect(
          rectangle.left,
          rectangle.top,
          rectangle.width,
          rectangle.height
        );

        rectangle = {
          left: minLeft,
          top: minTop,
          width: newWidth,
          height: newHeight,
        };
        context.fillRect(minLeft, minTop, newWidth, newHeight);
      };

      canvas.addEventListener("mousemove", handleMouseMove);

      canvas.addEventListener("mouseup", () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
      });
    });
  }, []);

  return <canvas ref={ref} className={classes.canvas}></canvas>;
};

export default Canvas;
