export const clearCanvas = (canvas: HTMLCanvasElement): void => {
  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, canvas.width, canvas.height);
};

export const drawBackground = (canvas: HTMLCanvasElement): void => {
  const context = canvas.getContext("2d")!;
  drawRectangle(context, "#fff", 0, 0, canvas.width, canvas.height);
};

export const drawRectangle = (
  context: CanvasRenderingContext2D,
  color: string,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
};

export const drawRectangleOutline = (
  context: CanvasRenderingContext2D,
  color: string,
  thickness: number,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  context.lineWidth = thickness;
  context.strokeStyle = color;
  context.strokeRect(x, y, width, height);
};

export const drawCircle = (
  context: CanvasRenderingContext2D,
  color: string,
  centerX: number,
  centerY: number,
  radius: number
): void => {
  context.beginPath();
  context.fillStyle = color;
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
  context.fill();
};

export const drawCircleOutline = (
  context: CanvasRenderingContext2D,
  color: string,
  thickness: number,
  centerX: number,
  centerY: number,
  radius: number
): void => {
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = thickness;
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
  context.stroke();
};

export const drawLine = (
  context: CanvasRenderingContext2D,
  color: string,
  thickness: number,
  startX: number,
  startY: number,
  endX: number,
  endY: number
): void => {
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = thickness;
  context.lineCap = "round";
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
};

export const drawPencil = (
  context: CanvasRenderingContext2D,
  color: string,
  thickness: number,
  coordinates: { x: number; y: number }[]
) => {
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = thickness;
  context.lineCap = "round";
  context.lineJoin = "round";
  for (let point of coordinates) {
    context.lineTo(point.x, point.y);
    context.stroke();
  }
  context.closePath();
};

export const fill = (
  canvas: HTMLCanvasElement,
  color: string,
  x: number,
  y: number
) => {
  const context = canvas.getContext("2d")!;
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);

  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Get index of pixels in image
  const getIndex = (x: number, y: number, width: number) => {
    const pixel = y * (width * 4) + x * 4;
    return [pixel, pixel + 1, pixel + 2, pixel + 3];
  };

  // Check if clicked pixel colour is same as desired colour
  const isColored = (rImage: number, gImage: number, bImage: number) => {
    return rImage === r && gImage === g && bImage === b && rImage;
  };

  // Get colors of chosen pixel
  const getColors = (rIndex: number, gIndex: number, bIndex: number) => {
    return [
      imageData.data[rIndex],
      imageData.data[gIndex],
      imageData.data[bIndex],
    ];
  };

  const [rClickedIndex, gClickedIndex, bClickedIndex] = getIndex(
    x,
    y,
    canvas.width
  );

  const [rClicked, gClicked, bClicked] = getColors(
    rClickedIndex,
    gClickedIndex,
    bClickedIndex
  );

  // Return if pixel clicked already desired colour
  if (rClicked === r && gClicked === g && bClicked === b) {
    return false;
  }

  const fillPixels = (x: number, y: number) => {
    let queue = [];
    queue.push([x, y]);
    while (queue.length) {
      const n = queue[0] as [number, number];
      queue.shift();
      const [rIndex, gIndex, bIndex] = getIndex(n[0], n[1], canvas.width);
      const [rData, gData, bData] = getColors(rIndex, gIndex, bIndex);
      // Ensure inside canvas and not already the desired colour and is the same colour as the first clicked pixel
      if (
        n[0] >= 0 &&
        n[0] < canvas.width &&
        n[1] >= 0 &&
        n[1] < canvas.height &&
        !isColored(rData, gData, bData) &&
        rData === rClicked &&
        gData === gClicked &&
        bData === bClicked
      ) {
        imageData.data[rIndex] = r;
        imageData.data[gIndex] = g;
        imageData.data[bIndex] = b;
        queue.push(
          [n[0] - 1, n[1]],
          [n[0] + 1, n[1]],
          [n[0], n[1] - 1],
          [n[0], n[1] + 1]
        );
      }
    }
  };

  fillPixels(x, y);

  context.putImageData(imageData, 0, 0);
  return true;
};
