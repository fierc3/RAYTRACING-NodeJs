'use strict';

let canvas1 = new Canvas1();
canvas1.Size(100, 100, 100);
canvas1.Fill(0, 0, 0.4);

let p = new vec3([40, 30, 10]);
let u = new vec3([-3, 2, 2]);

for (let lambda = -9; lambda <= 9; ++lambda)
{
    // Calculating: s = p + lambda * u
    let s = new vec3(p.add(u.mult(lambda)));
    canvas1.Pixel(s.xCoord(), s.yCoord(), s.zCoord, 1, 0, 1);
}
