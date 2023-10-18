import { vec3 } from "./RayTracingClasses.js";
import { memoize } from "./memoize.js";

class ray {
  constructor(origin = new vec3([0, 0, 0]), direction = new vec3([0, 0, 0])) {
    this.origin = new vec3(origin);
    this.direction = new vec3(direction);
    this.x = origin.x;
    this.y = origin.y;
    this.z = origin.z;
    this.dx = direction.x;
    this.dy = direction.y;
    this.dz = direction.z;
    this.IntSecPnt = undefined; // Point of intersection with the triangle
    this.closestIntersectionPnt = 1e10; // Closest intersection point to the origin
    this.IntSecPntTriangle = undefined; // Triangle intersected by the ray
    this.mu,
    this.nu
  }

  pointOfIntersection(triangle) {
    const q = new vec3(triangle.corner1); // First corner of the triangle
    const v = new vec3(triangle.dirVec1); // Vector from the first corner to the second
    const w = new vec3(triangle.dirVec2); // Vector from the first corner to the third

    const p = new vec3(this.origin); // Origin point of the ray
    const u = new vec3(this.direction); // Direction vector of the ray

    const D = calculateDeterminant(u, v, w);
    if (D === 0) {
      // Is parallel to the plane
      return;
    } else {
      const d = calculateDifferenceVector(q, p);
      const lambda = calculateLambda(D, d, v, w);
      if (lambda <= 0 || lambda > this.closestIntersectionPnt) {
        // Either behind camera or being covered (I think)
        return;
      }

      // Is point inside of triangle
      const mu = calculateMu(D, d, u, w);
      if (mu <= 0) {
        return;
      }
      const nu = calculateNu(D, d, u, v);
      if (nu <= 0) {
        return;
      }
      if (mu + nu < 1) {
        this.updateIntersectionPoint(p, u, lambda, triangle);
        
        this.mu = mu;
        this.nu = nu;
      } else {
        return;
      }
    }
  }

  updateIntersectionPoint(p, u, lambda, triangle) {
    this.IntSecPnt = new vec3(p.add(u.mult(lambda)));
    this.closestIntersectionPnt = lambda;
    this.IntSecPntTriangle = triangle;
  }

  _pointOfIntersection = memoize(this.pointOfIntersection);
}

// TODO: Decide which functions to memoize

// Compute the determinant of a matrix formed by three vectors
function calculateDeterminant(u, v, w) {
  // u: The first vector
  // v: The second vector
  // w: The third vector
  // Returns the determinant of the matrix formed by these vectors
  return u.det(v.neg(), w.neg());
}

// Compute the difference vector between two vectors
function calculateDifferenceVector(q, p) {
  return new vec3(q.sub(p));
}

// Compute the intersection parameter using Cramer's rule
// Lambda can be thought of as a value that scales the direction vector of the ray. 
// When lambda is 0, the intersection occurs at the origin of the ray, and as lambda increases, the intersection point moves further along the ray's direction.
function calculateLambda(D, d, v, w) {
  // D: The determinant of the system, which determines if there is a unique solution for the system of equations
  // d: The difference vector between the origin of the ray and the first corner of the triangle
  // v, w: Vectors from the first corner of the triangle to the second and third corners, respectively
  // lambda: The parameter representing the intersection point of the ray with the triangle's plane
  return d.det(v.neg(), w.neg()) / D;
}

// Compute the Barycentric coordinate mu using Cramer's rule
function calculateMu(D, d, u, w) {
  // D: The determinant of the system, which determines if there is a unique solution for the system of equations aka parallel or not
  // d: The difference vector between the origin of the ray and the first corner of the triangle
  // u: The direction vector of the ray
  // v, w: Vectors from the first corner of the triangle to the second and third corners, respectively
  // mu: The Barycentric coordinate representing the relative position within the triangle along the first edge
  return u.det(d, w.neg()) / D;
}

// Compute the Barycentric coordinate nu using Cramer's rule
function calculateNu(D, d, u, v) {
  // D: The determinant of the system, which determines if there is a unique solution for the system of equations
  // d: The difference vector between the origin of the ray and the first corner of the triangle
  // u: The direction vector of the ray
  // v, w: Vectors from the first corner of the triangle to the second and third corners, respectively
  // nu: The Barycentric coordinate representing the relative position within the triangle along the second edge
  return u.det(v.neg(), d) / D;
}

const createOriginRay = (x, y) => {
  return new ray(new vec3([x, y, -10000]), new vec3([0, 0, 1]));
};

export { ray, createOriginRay };
