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
  x: number,
  y: number,
  width: number,
  height: number
): void => {
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
  centerX: number,
  centerY: number,
  radius: number
): void => {
  context.beginPath();
  context.strokeStyle = color;
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
  context.stroke();
};

export const drawLine = (
  context: CanvasRenderingContext2D,
  color: string,
  startX: number,
  startY: number,
  endX: number,
  endY: number
): void => {
  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
};
