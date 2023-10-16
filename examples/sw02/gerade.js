'use strict';

let canvas1 = new Canvas1();
canvas1.Size(100,100);

for (let i = 10; i <= 90; ++i)
    canvas1.Pixel(i, i / 2, 1, 0, 0);
