import { remote } from "./lib/client.js";
import {vec2} from './lib/RayTracingClasses.js'

// setups up the web sockets to communicate with the canvas server
// first parameter is the socket address
// second parameter is the callback function that should be executed once the connection has been established
remote("ws://127.0.0.1:9013", paintImage);

function paintImage(sock) {
  let w = 100;
  let h = 100;

  sock.secureSend("s " + w + " " + h);
  sock.secureSend("f 0 0.4 0");
  
  let p = new vec2([10, 10]);
  let u = new vec2([2, 1]);

  for (let lambda = 0; lambda <= 30; ++lambda) {
    // Calculating: r = p + lambda * u
    let r = new vec2(p.add(u.mult(lambda)));
    sock.secureSend("p " + r.xCoord() + " " + r.yCoord() + " " + 1 + " " + 0.5 + "0");
  }

  let q = new vec2([20, 70]);
  let v = new vec2([1, -2]);

  for (let lambda = 0; lambda <= 30; ++lambda) {
    // Calculating: r = q + lambda * v
    let r = new vec2(q.add(v.mult(lambda)));
    sock.secureSend("p " + r.xCoord() + " " + r.yCoord() + " 0 0.5 1\r\n");
  }

  // Calculating:   p + lambda * u = q + mu * v
  // Which is:      lambda * u - mu * v = q - p = r
  // Starting with: r = q - p = q + (-p)

  let r = new vec2(q.sub(p));
  let d = u.det(v.neg());
  let lambda = r.det(v.neg()) / d;
  let mu = u.det(r) / d;

  console.log(r, d, lambda, mu);

  let s1 = new vec2(p.add(u.mult(lambda)));
  let s2 = new vec2(q.add(v.mult(mu)));

  console.log(s1);
  console.log(s2);

  sock.secureSend("p " + r.xCoord() + " " + r.yCoord() + " 0 1 0\r\n");
}
