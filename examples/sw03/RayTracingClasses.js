"use strict";
class vec2 // 2d vector, gleich wie bei Joachims Version vom 06.09.2023 aufgebaut (soweit möglich)
{
    constructor(vec)
    {
        if (vec && vec.length==2)
        { // Example: let vec = new vec2([1,2]);
            this.x = vec[0];
            this.y = vec[1];
        }
        else if (vec)
        { // Example: let vec = new vec2(vec);
            this.x = vec.x;
            this.y = vec.y;
        }
        else
        { // Example: let vec = new vec2();
            vec = [0,0];
            this.x = vec[0];
            this.y = vec[1];
        }
    } // tested successfully

    xCoord()
    {
        return this.x;
    } // tested successfully

    yCoord()
    {
        return this.y;
    } // tested successfully

    add(v) // v: other vector. Unfortunately, no operator overloading in JavaScript
    { // Example: p = p.add(u);
        let p = new vec2();
        p.x = this.x + v.x;
        p.y = this.y + v.y;
        return p;
    } // tested successfully

    neg() // Unfortunately, no operator overloading in JavaScript
    { // Example: p = p.neg();
        let p = new vec2();
        p.x = - this.x;
        p.y = - this.y;
        return p;
    } // tested successfully

    sub(v) // v: other vector. Unfortunately, no operator overloading in JavaScript
    { // Example: p = p.sub(u);
        let p = new vec2();
        p.x = this.x - v.x;
        p.y = this.y - v.y;
        return p;
    } // tested successfully

    mult(s) // s: scalar. Unfortunately, no operator overloading in JavaScript
    { // Example: p = p.mult(t);
        let p = new vec2();
        p.x = s * this.x;
        p.y = s * this.y;
        return p;
    } // tested successfully

    det(v) // v: other vector. Unfortunately, no operator overloading in JavaScript
    { // Example: p.det(v); for det(p, v)
        return this.x * v.y - this.y * v.x;
    } // tested successfully

    toString()
    {
        return "x: " + this.x + ", y: " + this.y;
    } // tested successfully
} // tested successfully

class vec3 // 3d vector, gleich wie bei Joachims Version vom 06.09.2023 aufgebaut (soweit möglich)
{
    constructor(vec)
    {
        if (vec && vec.length==3)
        { // Example: let vec = new vec3([1,2,3]);
            this.x = vec[0];
            this.y = vec[1];
            this.z = vec[2];
        }
        else if (vec)
        { // Example: let vec = new vec3(vec);
            this.x = vec.x;
            this.y = vec.y;
            this.z = vec.z;
        }
        else
        { // Example: let vec = new vec3();
            vec = [0,0,0];
            this.x = vec[0];
            this.y = vec[1];
            this.z = vec[2];
        }
    }

    xCoord()
    {
        return this.x;
    }

    yCoord()
    {
        return this.y;
    }

    zCoord()
    {
        return this.z;
    }

    add(v) // v: other vector. Unfortunately, no operator overloading in JavaScript
    { // Example: p = p.add(u);
        let p = new vec3();
        p.x = this.x + v.x;
        p.y = this.y + v.y;
        p.z = this.z + v.z;
        return p;
    }

    neg() // Unfortunately, no operator overloading in JavaScript
    { // Example: p = p.neg();
        let p = new vec3();
        p.x = - this.x;
        p.y = - this.y;
        p.z = - this.z;
        return p;
    }

    sub(v) // v: other vector. Unfortunately, no operator overloading in JavaScript
    { // Example: p = p.sub(u);
        let p = new vec3();
        p.x = this.x - v.x;
        p.y = this.y - v.y;
        p.z = this.z - v.z;
        return p;
    }

    mult(s) // s: scalar. Unfortunately, no operator overloading in JavaScript
    { // Example: p = p.mult(t);
        let p = new vec3();
        p.x = s * this.x;
        p.y = s * this.y;
        p.z = s * this.z;
        return p;
    }

    det(v, w) // v: other vector. Unfortunately, no operator overloading in JavaScript
    { // Example: p.det(v, w); for det(p, v, w)
        return this.x * v.y    * w.z    - this.z * v.y * w.x
                + v.x * w.y    * this.z - v.z    * w.y * this.x
                + w.x * this.y * v.z    - w.z    * this.y * v.x;
    }

    toString()
    {
        return "x: " + this.x + ", y: " + this.y + ", z: " + this.z;
    }
}

class Canvas1 // gleich wie bei Joachims Version vom 06.09.2023 aufgebaut (soweit möglich)
{
    constructor()
    {
        document.write("<canvas id='canvas' style='position:absolute; left:100px; top:100px; border:0px; display:block; background: #77f;'>");
        document.write("Unfortunately, your browser does not support the 'canvas' element. Please try to enable it or use another browser.");
        document.write("</canvas>");
        this.canvas = document.querySelector('canvas');
        this.dimensions = {width: window.innerWidth, height: window.innerHeight};
        this.canvas.width = this.dimensions.width;
        this.canvas.height = this.dimensions.height;
        this.DefaultWidth = 800;
        this.DefaultHeight = 600;
        this.depth = 1000;
        this.sltSize(this.DefaultWidth, this.DefaultHeight, 300);
        this.context = this.canvas.getContext('2d');
        this.scaleX = 1;
        this.scaleY = 1;
        this.context.scale(this.scaleX,this.scaleY);
        this.Changed = false;
        this.DefaultColor = {r: 1, g: 1, b: 1};
        this.backColor = this.DefaultColor;
        this.lineWith = 1;
        this.smooth = false;
    }

    interpolate(fg, bg, t)
    {
        return ((1-t) * fg + t * bg);
    }

    ComputeBox(p, xmin, xmax, ymin, ymax)
    {
        let n = Math.max (0, LineWidth - 1);
        let r = n / 2;
        let s = n - r;

        xmin = p.xCoord() - r; xmax = p.xCoord() + s;
        ymin = p.yCoord() - r; ymax = p.yCoord() + s;
    }

    DepthCueing (Color, z)
    {
        let t = z / this.depth;
        if (t < 0) t = 0;
        if (t > 1) t = 1;
        let r = this.interpolate (Color.r, this.backColor.r, t);
        let g = this.interpolate (Color.g, this.backColor.g, t);
        let b = this.interpolate (Color.b, this.backColor.b, t);
        return {r: r, g: g, b: b};
	}

    setScale(x = 1, y = 1)
    {
        this.scaleX = x;
        this.scaleY = y;
        this.context.scale(this.scaleX,this.scaleY);
        //this.Show();
    }

    MarkChanged()
    {
        if (!this.Changed) {this.Changed = true;}
    }

    Show()
    {
        this.canvas.width+=0; // resize with difference = 0 to let the browser redraw the canvas
    }

    sltshow()
    {
        this.Changed = false;
        //this.Show();
    }

    sltClear()
    {
        this.context.fillStyle = this.DefaultColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    sltSize(x = window.innerWidth, y = window.innerHeight, dp)
    {
        this.canvas.width = x;
        this.canvas.height = y;
        this.depth = dp < 1 ? 1 : dp;
        //this.sltFill(this.DefaultColor);
        if (!this.Changed) {this.Changed = true;}
        //this.Show();
    }

    sltFill(Color = this.DefaultColor)
    {
        this.DefaultColor = Color;
        this.context.fillStyle = Color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    sltLineWidth(lw)
    {
        lineWidth = lw;
    }

    sltSmooth(smooth)
    {
        smooth = smooth;
    }

    sltPixel(x,y,Color)
    {
        this.context.fillStyle = Color;
        this.context.lineWidth = 1;
        this.context.fillRect(x,y,1,1);
        if (!this.Changed) {this.Changed = true;}
        //this.Show();
    }

    sltPixel2(p, Color)
    {
        this.computeBox(p, xmin, xmax, ymin, ymax);
        this.context.fillStyle = Color;
        for (let x = xmin; x <= xmax; x++)
            for (let y = ymin; y <= ymax; y++)
                this.context.fillRect(x,y,1,1);
        if (!this.Changed) {this.Changed = true;}
    }

    sltPixel3(p, z, Color)
    {
        this.computeBox(p, xmin, xmax, ymin, ymax);
        this.context.fillStyle = this.depthCueing(Color, z);
        for (let x = xmin; x <= xmax; x++)
            for (let y = ymin; y <= ymax; y++)
                this.context.fillRect(x,y,1,1);
        if (!this.Changed) {this.Changed = true;}
    }

    sltLine2 (p, q, Color)
    {
        let dx = q.xCoord() - p.xCoord();
        let dy = q.yCoord() - p.yCoord();
        let d = Math.max(Math.abs(dx), Math.abs(dy));

        if (d == 0)
        {
            this.sltPixel2 (p, Color);
            return;
        }

        let mx = dx / d;
        let my = dy / d;
        for (let i = 0; i <= d; ++i)
        {
            xy = new vec2(p.xCoord() + i * mx + 0.5, p.yCoord() + i * my + 0.5);
            this.sltPixel2 (xy, Color);
        }
    }

    sltLine3 (p, pz, q, qz, Color)
    {
        let dx = q.xCoord() - p.xCoord();
        let dy = q.yCoord() - p.yCoord();
        let d = Math.max(Math.abs(dx), Math.abs(dy));

        if (d == 0)
        {
            this.sltPixel3 (p, pz, Color);
            return;
        }

        let mx = dx / d;
        let my = dy / d;
        let mz = (qz - pz) / d;
        for (let i = 0; i <= d; ++i)
        {
            xy = new vec3(p.xCoord() + i * mx + 0.5, p.yCoord() + i * my + 0.5);
            let z = pz + i * mz + 0.5;
            this.sltPixel3 (xy, z, Color);
        }
    }

    Size(wd, ht, dp)
    {
        this.canvas.width = this.DefaultWidth;
        this.canvas.height = this.DefaultHeight;
        this.scaleX = this.DefaultWidth/wd;
        this.scaleY = this.DefaultHeight/ht;
        this.context.scale(this.scaleX,this.scaleY);
    }  // tested successfully

    Pixel(x, y, z, r, g, b)
    {
        if (r <= 1 && g <= 1 && b <= 1) // dann ist eines im Range 0..1 statt 0..256
        {
            r = r*256;
            g = g*256;
            b = b*256;
        }

        this.context.fillStyle = "rgb("+r+","+g+","+b+")";
        this.context.lineWidth = 1;
        this.context.fillRect(x,y,1,1);
    }  // tested successfully

    ShowLine(x0, y0, z0, x1, y1, z1, r, g, b)
    {
        if (r <= 1 && g <= 1 && b <= 1) // dann ist eines im Range 0..1 statt 0..256
        {
            r = r*256;
            g = g*256;
            b = b*256;
        }

        this.context.fillStyle = "rgb("+r+","+g+","+b+")";
        this.context.lineWidth = 1;
        this.context.beginPath();
        this.context.moveTo(x0,y0);
        this.context.lineTo(x1,y1);
        this.context.stroke();
    }  // tested successfully

    Fill(r, g, b)
    {
        if (r <= 1 && g <= 1 && b <= 1) // dann ist eines im Range 0..1 statt 0..256
        {
            r = r*256;
            g = g*256;
            b = b*256;
        }
        this.DefaultColor = "rgb("+r+","+g+","+b+")";
        this.context.fillStyle = this.DefaultColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
} // tested successfully

class triangle
{
    constructor(corner1, corner2, corner3, material = {r: 0, g: 0, b: 1})
    { 
        if (corner1 && corner2 && corner3)    
        {
            this.corner1 = new vec3(corner1);
            this.corner2 = new vec3(corner2);
            this.corner3 = new vec3(corner3);
            this.dirVec1 = this.corner2.sub(this.corner1);
            this.dirVec2 = this.corner3.sub(this.corner1);
 			this.dirVec3 = this.corner3.sub(this.corner2);
			this.material = material;
        }
        else
        {
            alert("Triangle needs 3 corners");
        }
 	 }

    Draw(canvas)
    {
        for (let lambda = 0; lambda <= 1; lambda = lambda + 0.01)
        {
            canvas.Pixel(	  this.corner1.x + lambda * this.dirVec1.x, 
							  this.corner1.y + lambda * this.dirVec1.y, 
							  this.corner1.z + lambda * this.dirVec1.z, 1, 1, 1);

            canvas.Pixel(     this.corner1.x + lambda * this.dirVec2.x, 
							  this.corner1.y + lambda * this.dirVec2.y, 
							  this.corner1.z + lambda * this.dirVec2.z, 1, 1, 1);

            canvas.Pixel(     this.corner2.x + lambda * this.dirVec3.x, 
							  this.corner2.y + lambda * this.dirVec3.y, 
							  this.corner2.z + lambda * this.dirVec3.z, 1, 1, 1);
        }
    }

    toString()
    {
        return "P1: " + this.corner1 + ", P2: " + this.corner2 + ", P3: " + this.corner3 + ", Mat: " + this.material;
    }
}

class corner    // often called "vertex"
{
    constructor(point = new vec3([0,0,0]), normal = new vec3([0,0,0]))
    {   // Example: let p = new vec3([1,2,3]); let corner1 = new corner(p);
        this.x = point.x;
        this.y = point.y;
        this.z = point.z;
        this.nx = normal.x;
        this.ny = normal.y;
        this.nz = normal.z;
    }

    toString()
    {
        return "x: " + this.x + ", y: " + this.y + ", z: " + this.z + ", nx: " + this.nx + ", ny: " + this.ny + ", nz: " + this.nz;
    }
}

class ray
{
    constructor(origin = new vec3([0,0,0]), direction = new vec3([0,0,0]))
    {   
		// Example: 
		// let p = new vec3([1,2,3]); 
		// let d = new vec3([0,0,1]); 
		// let r = new ray(p,d);
        this.origin = new vec3(origin);
        this.direction = new vec3(direction);
        this.x = origin.x;
        this.y = origin.y;
        this.z = origin.z;
        this.dx = direction.x;
        this.dy = direction.y;
        this.dz = direction.z;
        this.IntSecPnt = undefined;
        this.closestIntersectionPnt = 1e10;
        this.IntSecPntTriangle = undefined;		
    }

    pointOfIntersection(triangle)
    {
        // Example:
        // let ray1      = new ray(Origin = new vec3([40, 30, 10]), Direction = new vec3([-1, 2, -2]));
        // let triangle1 = new triangle([50, 40, 10], [50+3, 40+2, 10+1], [50+2, 40+(-1), 10+1]);
        // IntSecPnt1    = ray1.pointOfIntersection(triangle1);
        
        // triangle plane = q + mu * v + nu * w
        let q = new vec3(triangle.corner1);
        let v = new vec3(triangle.dirVec1);
        let w = new vec3(triangle.dirVec2);

        // ray = p + lambda * u
        let p = new vec3(this.origin);
        let u = new vec3(this.direction);

        // Cramer's rule for:                                         p + lambda * u = q + mu * v + nu * w
        // where            intersection point on triangle plane:                s = q + mu * v + nu * w
        // and              intersection point on ray:                           s = p + lambda * u
        // Cramer's rule (for x:= lambda, y:= mu, z:= nu):
        // a1*x + b1*y + c1*z = d1
        // a2*x + b2*y + c2*z = d2
        // a3*x + b3*y + c3*z = d3
        // x = det(d,b,c) / det(a,b,c)
        // y = det(a,d,c) / det(a,b,c)
        // z = det(a,b,d) / det(a,b,c)
        // Applied for our variables:
        //       a = ray.direction                  = u
        //       b = -(triangle.corner2 - q)        = -v
        //       c = -(triangle.corner3 - q)        = -w
        //       d = triangle.corner1 - ray.origin  = q-p
        //       x = det(d,b,c)/det(a,b,c)
        //       y = det(a,d,c)/det(a,b,c)
        //       z = det(a,b,d)/det(a,b,c)

        let D  = u.det(v.neg(),w.neg());    // D  = det (u, -v, -w)
        if (D == 0)
        { // ray is parallel to triangle plane
            return;
        }
        else
        {
            let d      = new vec3(q.sub(p));          // d  = q - p

            let lambda = d.det(v.neg(),w.neg())/D;    // Dx = det (d, -v, -w) / D
            if (lambda <= 0 || lambda > this.closestIntersectionPnt)
            { // not in front of camera or there is an intersecton point closer to the origin already
                return;
            }

            let mu     = u.det(d,w.neg())      /D;    // Dy = det (u, d, -w) / D
            if (mu <= 0)
            { // not WITHIN triangle
                return;
            }

            let nu     = u.det(v.neg(),d)      /D;    // Dz = det (u, -v, d) / D
            if (nu <= 0)
            { // not WITHIN triangle
                return;
            }

            if (mu + nu < 1)
            { // intersection point is WITHIN triangle and closest to camera
                this.IntSecPnt = new vec3(p.add(u.mult(lambda)));
                this.closestIntersectionPnt = lambda;
                this.IntSecPntTriangle = triangle;
            }
            else
            { // intersection point is NOT within triangle
                return;
            }
        }
        return;
        //console.log(this.IntSecPnt);
    }

    toString()
    {
        return "x: " + this.x + ", y: " + this.y + ", z: " + this.z + ", dx: " + this.dx + ", dy: " + this.dy + ", dz: " + this.dz;
    }
}
