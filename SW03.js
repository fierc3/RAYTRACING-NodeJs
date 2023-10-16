import { remote } from "./lib/client.js";
import { triangle } from "./lib/triangle.js";
import { vec3 } from "./lib/RayTracingClasses.js";
import { ray } from "./lib/ray.js";
// import {vec2} from './lib/RayTracingClasses.js' example how helper methods can be loaded

// setups up the web sockets to communicate with the canvas server
// first parameter is the socket address
// second parameter is the callback function that should be executed once the connection has been established
remote("ws://127.0.0.1:9013", paintImage);

const DefaultColor = "rgb(0,0,0)";
const BackColor = {r: 0, g:0, b: 0};

function interpolate(fg, bg, t)
{
    //console.log(`${fg} ${bg} ${t}`)
    return ((1-t) * fg + t * bg);
}

function DepthCueing (Color, z)
{
    let t = z / 1;
    if (t < 0) t = 0;
    if (t > 1) t = 1;
    let r = interpolate (Color.r, BackColor.r, t);
    let g = interpolate (Color.g, BackColor.g, t);
    let b = interpolate (Color.b, BackColor.b, t);
    return {r: r, g: g, b: b};
}

function paintImage(sock) {

  const width = 600;
  const height = 850;
  
  sock.secureSend("s " + width + " " + height);
  sock.secureSend("f 0 0 0");

  let triangles = [];

  let a = new vec3([93, 298, 294]);
  let b = new vec3([38, 182, 141]);
  let c = new vec3([152, 34, 212]);
  triangles.push(new triangle(a, b, c));
  console.log(triangles[0]);
  triangles[0].draw(sock);

  let d = new vec3([206, 150, 366]);
  triangles.push(new triangle(a, c, d));
  triangles[1].draw(sock);

  let e = new vec3([362, 218, 259]);
  triangles.push(new triangle(e, d, c));
  triangles[2].draw(sock);

  let f = new vec3([307, 102, 106]);
  triangles.push(new triangle(e, d, f));
  triangles[3].draw(sock);

  triangles.push(new triangle(f, c, b));
  triangles[4].draw(sock);

  let g = new vec3([194, 250, 34]);
  triangles.push(new triangle(f, b, g));
  triangles[5].draw(sock);

  let h = new vec3([248, 366, 188]);
  triangles.push(new triangle(g, h, e));
  triangles[6].draw(sock);

  triangles.push(new triangle(g, e, f));
  triangles[7].draw(sock);

  triangles.push(new triangle(h, a, d));
  triangles[8].draw(sock);

  triangles.push(new triangle(h, d, e));
  triangles[9].draw(sock);

  triangles.push(new triangle(g, b, a));
  triangles[10].draw(sock);

  triangles.push(new triangle(g, a, h));
  triangles[11].draw(sock);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // send a ray
      let ray1 = new ray(
        new vec3([x, y, -10000]),
        new vec3([0, 0, 1])
      );
      triangles.forEach(triangle => {
        ray1.pointOfIntersection(triangle);
        if (ray1.IntSecPnt != undefined) {
          let colorPixel = DepthCueing(
            ray1.IntSecPntTriangle.material,
            ray1.IntSecPnt.z
          );
          //console.log("Result" + JSON.stringify(colorPixel));
          sock.pixel(
            x,
            y,
            ray1.IntSecPnt.z,
            colorPixel.r,
            colorPixel.g,
            colorPixel.b
          );
        } else
          sock.pixel(
            x,
            y,
            0,
            DefaultColor.r,
            DefaultColor.g,
            DefaultColor.b
          );
      }
      );
    }
  }
}
