import { memoize } from "./memoize.js";

// Function to convert radians to degrees
function radians_to_degrees(radians) {
    return radians * (180 / Math.PI);
  }

  // Function to find the distance between 2 points in a 3D plane
  function dist(p1, p2) {
    return Math.sqrt(
      Math.pow(p1[0] - p2[0], 2) +
        Math.pow(p1[1] - p2[1], 2) +
        Math.pow(p1[2] - p2[2], 2)
    );
  }

  const _dist = memoize(dist);

  // Function to find the angle in 3D space
  function find_angle(a, b, c) {
    const ab = _dist(a, b);
    const bc = _dist(b, c);
    const ac = _dist(a, c);

    const angle =
      (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / (2 * ab * bc);
    return radians_to_degrees(Math.acos(angle));
  }


  const _find_angle = memoize(find_angle);

  export {_find_angle, _dist, find_angle}