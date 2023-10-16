'use strict';

let canvas1 = new Canvas1();
canvas1.Size(100, 100, 100);
canvas1.Fill(0, 0, 0.4);

let p = new vec3([50, 40, 10]);
let u = new vec3([3, 2, 1]);
let v = new vec3([2, -1, 1]);

let r = [1, 1, 0, 1];
let g = [1, 0, 1, 1];
let b = [1, 0, 0, 0];

for (let lambda = -9; lambda <= 9; ++lambda)
    for (let mu = -9; mu <= 9; ++mu)
    {
        // Calculating: s = p + lambda * u + mu * v
        let s = new vec3(p.add(u.mult(lambda)));
            s = s.add(v.mult(mu));

        let f = 0;
        if (lambda == 0 && mu  > 0) {f = f | 1;}
        if (lambda >  0 && mu == 0) {f = f | 2;}

        let d = lambda >= 0 && mu >= 0;

        canvas1.Pixel(s.xCoord(), s.yCoord(), s.zCoord(), d*r[f], g[f], b[f]);
    }
