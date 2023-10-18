import { memoize } from "./memoize.js";

function interpolate(fg, bg, t) {
  //console.log(`${fg} ${bg} ${t}`)
  return (1 - t) * fg + t * bg;
}

function indicateDepth(Color, z, BackColor) {
  z = z / 500;
  let t = z / 1;
  t = (Math.abs(t*t));

  if (t < 0) t = 0;
  if (t > 1) t = 1;
  let r = interpolate(Color.r, BackColor.r, t);
  let g = interpolate(Color.g, BackColor.g, t);
  let b = interpolate(Color.b, BackColor.b, t);

  return { r: r, g: g, b: b };
}

const _indicateDepth = memoize(indicateDepth);

export { interpolate, indicateDepth, _indicateDepth };
