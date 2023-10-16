'use strict';

let canvas1 = new Canvas1();
canvas1.Size(100,100);

let p = new vec2([10,10]);
let u = new vec2([2,1]);

for (let lambda = 0; lambda <= 30; ++lambda)
{
    // Calculating: r = p + lambda * u
    let r = new vec2(p.add(u.mult(lambda)));
    canvas1.Pixel(r.xCoord(), r.yCoord(), 1, 0.5, 0);
}
