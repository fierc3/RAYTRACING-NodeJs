'use strict';

let canvas1 = new Canvas1();
canvas1.Size(100, 100, 50);
canvas1.Fill(0, 0, 0.4);

let zmin = 0;
let zmax = 100;

let p = new vec3([40, 30, 10]);
let u = new vec3([-1, 2, -2]);

for (let lambda = -9; lambda <= 9; ++lambda)
{
    // Calculating: s = p + lambda * u
    let s = new vec3(p.add(u.mult(lambda)));
    let c = (zmax - s.zCoord()) / (zmax - zmin);
    canvas1.Pixel(s.xCoord(), s.yCoord(), s.zCoord(), c, c, 0);
}

let q = new vec3([50, 40, 10]);
let v = new vec3([3, 2, 1]);
let w = new vec3([2, -1, 1]);

let r = [1, 1, 0, 1];
let g = [1, 0, 1, 1];
let b = [1, 0, 0, 0];

for (let mu = -9; mu <= 9; ++mu)
    for (let nu = -9; nu <= 9; ++nu)
    {
        // Calculating: s = q + mu * v + nu * w
        let s = new vec3(q.add(v.mult(mu)));
            s = s.add(w.mult(nu));

        let f = 0;
        if (mu == 0 && nu >  0) {f = f | 1;}
        if (mu >  0 && nu == 0) {f = f | 2;}

        let d = mu >= 0 && nu >= 0;

        canvas1.Pixel(s.xCoord(), s.yCoord(), s.zCoord(), d*r[f], g[f], b[f]);
    }

let t = new vec3(q.sub(p));
let d = u.det(v.neg(), w.neg());
let lambda = t.det(v.neg(), w.neg()) / d;
let mu = u.det(t, w.neg()) / d;
let nu = u.det(v.neg(), t) / d;

console.log(lambda, mu, nu);

let s1 = new vec3(p.add(u.mult(lambda)));
let s2 = new vec3(q.add(v.mult(mu)));
    s2 = s2.add(w.mult(nu));
console.log(s1, s2);

canvas1.Pixel(s1.xCoord(), s1.yCoord(), s1.zCoord(), 1, 0, 0);
