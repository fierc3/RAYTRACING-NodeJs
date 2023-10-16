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


let q = new vec2([20,70]);
let v = new vec2([1,-2]);

for (let lambda = 0; lambda <= 30; ++lambda)
{
    // Calculating: r = q + lambda * v
    let r = new vec2(q.add(v.mult(lambda)));
    canvas1.Pixel(r.xCoord(), r.yCoord(), 0, 0.5, 1);
}


// Calculating:   p + lambda * u = q + mu * v
// Which is:      lambda * u - mu * v = q - p = r
// Starting with: r = q - p = q + (-p)

let r = new vec2(q.sub(p));
let d = u.det(v.neg());
let lambda = r.det(v.neg()) / d;
let mu = u.det(r) / d;

console.log(r,d,lambda,mu);

let s1 = new vec2(p.add(u.mult(lambda)));
let s2 = new vec2(q.add(v.mult(mu)));

console.log(s1);
console.log(s2);

canvas1.Pixel(s1.xCoord(), s1.yCoord(), 0, 1, 0);

