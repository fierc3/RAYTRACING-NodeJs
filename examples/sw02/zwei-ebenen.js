'use strict';
let canvas1 = new Canvas1();
canvas1.Size(100, 100, 200);
canvas1.Fill(0,0,0.4);

let p1 = new vec3([70,    60,   10]);
let u1 = new vec3([ 0.50, -0.25, 0.25]);
let v1 = new vec3([ 0.25,  0.5, -0.25]);

let p2 = new vec3([50,    40,   20]);
let u2 = new vec3([ 1,     0.5, -0.25]);
let v2 = new vec3([-0.5,   0.5,  0.5]);

for (let lambda = -30; lambda <= 30; lambda++)
    for (let mu = -30; mu <= 30; mu++)
    {
        // s1 = p1 + lambda * u1 + mu * v1;
        let s1 = new vec3();
        s1 = p1.add(u1.mult(lambda));
        s1 = s1.add(v1.mult(mu));

        // s2 = p2 + lambda * u2 + mu * v2;
        let s2 = new vec3();
        s2 = p2.add(u2.mult(lambda));
        s2 = s2.add(v2.mult(mu));

        canvas1.Pixel(s1.xCoord(), s1.yCoord(), s1.zCoord(), 1, 1, 1);
        canvas1.Pixel(s2.xCoord(), s2.yCoord(), s2.zCoord(), 1, 1, 0);
    }

