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

export const clearCanvas = (canvas: HTMLCanvasElement): void => {
  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, canvas.width, canvas.height);
};
