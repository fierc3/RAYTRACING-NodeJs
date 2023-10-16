import { vec3 } from "./RayTracingClasses.js";

class ray {
  constructor(origin = new vec3([0, 0, 0]), direction = new vec3([0, 0, 0])) {
    // Example:
    // let p = new vec3([1,2,3]);
    // let d = new vec3([0,0,1]);
    // let r = new ray(p,d);
    this.origin = new vec3(origin);
    this.direction = new vec3(direction);
    this.x = origin.x;
    this.y = origin.y;
    this.z = origin.z;
    this.dx = direction.x;
    this.dy = direction.y;
    this.dz = direction.z;
    this.IntSecPnt = undefined;
    this.closestIntersectionPnt = 1e10;
    this.IntSecPntTriangle = undefined;
  }

  pointOfIntersection(triangle) {
    // Example:
    // let ray1      = new ray(Origin = new vec3([40, 30, 10]), Direction = new vec3([-1, 2, -2]));
    // let triangle1 = new triangle([50, 40, 10], [50+3, 40+2, 10+1], [50+2, 40+(-1), 10+1]);
    // IntSecPnt1    = ray1.pointOfIntersection(triangle1);

    // triangle plane = q + mu * v + nu * w
    let q = new vec3(triangle.corner1);
    let v = new vec3(triangle.dirVec1);
    let w = new vec3(triangle.dirVec2);

    // ray = p + lambda * u
    let p = new vec3(this.origin);
    let u = new vec3(this.direction);

    // Cramer's rule for:                                         p + lambda * u = q + mu * v + nu * w
    // where            intersection point on triangle plane:                s = q + mu * v + nu * w
    // and              intersection point on ray:                           s = p + lambda * u
    // Cramer's rule (for x:= lambda, y:= mu, z:= nu):
    // a1*x + b1*y + c1*z = d1
    // a2*x + b2*y + c2*z = d2
    // a3*x + b3*y + c3*z = d3
    // x = det(d,b,c) / det(a,b,c)
    // y = det(a,d,c) / det(a,b,c)
    // z = det(a,b,d) / det(a,b,c)
    // Applied for our variables:
    //       a = ray.direction                  = u
    //       b = -(triangle.corner2 - q)        = -v
    //       c = -(triangle.corner3 - q)        = -w
    //       d = triangle.corner1 - ray.origin  = q-p
    //       x = det(d,b,c)/det(a,b,c)
    //       y = det(a,d,c)/det(a,b,c)
    //       z = det(a,b,d)/det(a,b,c)

    let D = u.det(v.neg(), w.neg()); // D  = det (u, -v, -w)
    if (D == 0) {
      // ray is parallel to triangle plane
      return;
    } else {
      let d = new vec3(q.sub(p)); // d  = q - p

      let lambda = d.det(v.neg(), w.neg()) / D; // Dx = det (d, -v, -w) / D
      if (lambda <= 0 || lambda > this.closestIntersectionPnt) {
        // not in front of camera or there is an intersecton point closer to the origin already
        return;
      }

      let mu = u.det(d, w.neg()) / D; // Dy = det (u, d, -w) / D
      if (mu <= 0) {
        // not WITHIN triangle
        return;
      }

      let nu = u.det(v.neg(), d) / D; // Dz = det (u, -v, d) / D
      if (nu <= 0) {
        // not WITHIN triangle
        return;
      }

      if (mu + nu < 1) {
        // intersection point is WITHIN triangle and closest to camera
        this.IntSecPnt = new vec3(p.add(u.mult(lambda)));
        this.closestIntersectionPnt = lambda;
        this.IntSecPntTriangle = triangle;
      } else {
        // intersection point is NOT within triangle
        return;
      }
    }
    return;
    //console.log(this.IntSecPnt);
  }
}

export { ray };
