function toCartesian (canvas, context) {
  context.translate(0, canvas.height);
  context.scale(1, -1);
}

export { toCartesian }
