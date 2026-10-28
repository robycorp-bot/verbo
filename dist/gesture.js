// Ignore diagonal, slow, and short gestures so reading and tapping stay stable.
export function swipeDirection(start, end) {
  if (!start || !end || end.time - start.time > 1200) return 0;
  const dx=end.x-start.x,dy=end.y-start.y;
  if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.2)return dx<0?1:-1;
  if(Math.abs(dy)>80&&Math.abs(dy)>Math.abs(dx)*1.2)return dy<0?1:-1;
  return 0;
}
