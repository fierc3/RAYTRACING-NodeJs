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

    xx()
    {
        return this.x;
    } // tested successfully

    yy()
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

    xx()
    {
        return this.x;
    }

    yy()
    {
        return this.y;
    }

    zz()
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
                + w.x * this.y * v.z    - w.z    * u.y * v.x;
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
        this.context = this.canvas.getContext('2d');
        this.scaleX = 1;
        this.scaleY = 1;
        this.context.scale(this.scaleX,this.scaleY);
        this.Changed = false;
        this.DefaultColor = "#000000";
        this.DefaultWidth = 600;
        this.DefaultHeight = 400;
        this.sltSize(this.DefaultWidth, this.DefaultHeight);
        //addEventListener('resize', this.sltSize, false);
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

    sltSize(x = window.innerWidth, y = window.innerHeight)
    {
        this.canvas.width = x;
        this.canvas.height = y;
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

    sltPixel(x,y,Color)
    {
        this.context.fillStyle = Color;
        this.context.lineWidth = 1;
        this.context.fillRect(x,y,1,1);
        if (!this.Changed) {this.Changed = true;}
        //this.Show();
    }

    CanvasSize(x, y)
    {
        this.canvas.width = this.DefaultWidth;
        this.canvas.height = this.DefaultHeight;
        this.scaleX = this.DefaultWidth/x;
        this.scaleY = this.DefaultHeight/y;
        this.context.scale(this.scaleX,this.scaleY);
    }  // tested successfully

    Pixel(x, y, r, g, b)
    {
        if (r * g * b <= 1) // dann ist eines < 1 und damit alle im Range 0..1 statt 0..256
        {
            r = r*256;
            g = g*256;
            b = b*256;
        }

        this.context.fillStyle = "rgb("+r+","+g+","+b+")";
        this.context.lineWidth = 1;
        this.context.fillRect(x,y,1,1);
    }  // tested successfully

    Fill(r, g, b)
    {
        if (r * g * b <= 1) // dann ist eines < 1 und damit alle im Range 0..1 statt 0..256
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

export {Canvas1, vec2, vec3};