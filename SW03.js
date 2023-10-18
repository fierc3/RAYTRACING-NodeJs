import { remote } from "./lib/client.js";
import { triangle } from "./lib/triangle.js";
import { vec3 } from "./lib/RayTracingClasses.js";
import { ray, createOriginRay } from "./lib/ray.js";
import { indicateDepth, _indicateDepth } from "./lib/depth.js";
import { _find_angle, find_angle } from "./lib/angles.js";
import { simpleCube } from "./lib/shapes.js";
// import {vec2} from './lib/RayTracingClasses.js' example how helper methods can be loaded

// setups up the web sockets to communicate with the canvas server
// first parameter is the socket address
// second parameter is the callback function that should be executed once the connection has been established
remote("ws://127.0.0.1:9013", paintImage);

const BackColor = { r: 0, g: 0, b: 0 };

function paintImage(sock) {
  const startMillisecond = Date.now();

  console.log("Start MS", startMillisecond);

  const width = 600;
  const height = 550;

  sock.secureSend("s " + width + " " + height);
  sock.secureSend("f 0 0 0");

  let triangles = simpleCube();

  // Display Triangle Corner Points
  //sock.sendBatch();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // send a ray

      const border = 3;
      const ray1 = createOriginRay(x, y);
      const xRay2 = createOriginRay(x + border, y);
      const xRay3 = createOriginRay(x - border, y);
      const yRay2 = createOriginRay(x, y + border);
      const yRay3 = createOriginRay(x, y - border);

      triangles.forEach((triangle) => {
        ray1.pointOfIntersection(triangle);
        if (ray1.IntSecPnt != undefined) {
          // only check the others if they "main" raycast hit anything
          // this should optimize performance a bit
          xRay2.pointOfIntersection(triangle);
          xRay3.pointOfIntersection(triangle);
          yRay2.pointOfIntersection(triangle);
          yRay3.pointOfIntersection(triangle);

          let colorPixel = { r: 0, g: 0, b: 0 };
          const point1 = [ray1.IntSecPnt.x, ray1.IntSecPnt.y, ray1.IntSecPnt.z];
          const xPoint2 = xRay2.IntSecPnt
            ? [xRay2.IntSecPnt.x, xRay2.IntSecPnt.y, xRay2.IntSecPnt.z]
            : point1;
          const xPoint3 = xRay3.IntSecPnt
            ? [xRay3.IntSecPnt.x, xRay3.IntSecPnt.y, xRay3.IntSecPnt.z]
            : point1;

          const yPoint2 = yRay2.IntSecPnt
            ? [yRay2.IntSecPnt.x, yRay2.IntSecPnt.y, yRay2.IntSecPnt.z]
            : point1;
          const yPoint3 = yRay3.IntSecPnt
            ? [yRay3.IntSecPnt.x, yRay3.IntSecPnt.y, yRay3.IntSecPnt.z]
            : point1;

          let xAngle = 0;
          let yAngle = 0;
          if (point1 !== xPoint2 && xPoint2 !== xPoint3) {
            xAngle = _find_angle(xPoint2, point1, xPoint3);
            //console.log(xAngle);
          }

          if (point1 !== yPoint2 && yPoint2 !== xPoint3) {
            yAngle = _find_angle(yPoint2, point1, yPoint3);

            // console.log(angle);
          }

          let isEdge = false;

          if (xAngle < 100 || !xRay2.IntSecPnt || !xRay3.IntSecPnt) {
            // console.log("found");
            colorPixel.r = 1;
            isEdge = true;
          } else if (yAngle < 170 || !yRay2.IntSecPnt || !yRay3.IntSecPnt) {
            colorPixel.g = 1;
            isEdge = true;
          }

          //console.log("angles", xAngle, yAngle);
          colorPixel = _indicateDepth(
            isEdge ? colorPixel : ray1.IntSecPntTriangle.material,
            ray1.IntSecPnt.z,
            BackColor
          );
          
          //colorPixel.b = colorPixel.b * (ray1.mu + 0.5);
          //colorPixel.b = colorPixel.b * (ray1.nu + 0.5);

          sock.pixel(x, y, colorPixel.r, colorPixel.g, colorPixel.b);
        } else {
          // we could color the backcolor here, but also we could just ignore since we fill the background at the beginning
          //sock.pixel(x, y, BackColor.r, BackColor.g, BackColor.b);
        }
      });
    }
  }
  const endMilliSecond = Date.now();
  console.log("End MS", endMilliSecond);
  console.log("Elapsed time MS", endMilliSecond - startMillisecond);
  //sock.sendBatch();
}

/* 
time stamps
Without memoize
7.5 - 8.9sec
With depth memoize
6.9 - 7.9sec


*/
