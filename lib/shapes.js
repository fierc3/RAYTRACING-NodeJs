import { vec3 } from "./RayTracingClasses.js";
import { triangle } from "./triangle.js";

const simpleCube = () => {
    let a = new vec3([93, 298, 294]);
    let b = new vec3([38, 182, 141]);
    let c = new vec3([152, 34, 212]);
    let triangles = [new triangle(a, b, c)];
    // triangles.push(new triangle(a, b, c));
    // triangles[0].draw(sock);
  
    let d = new vec3([206, 150, 366]);
    triangles.push(new triangle(a, c, d));
    //triangles[1].draw(sock);
  
    let e = new vec3([362, 218, 259]);
    triangles.push(new triangle(e, d, c));
  
    let f = new vec3([307, 102, 106]);
    triangles.push(new triangle(e, d, f));
    //triangles[3].draw(sock);
  
    triangles.push(new triangle(f, c, b));
    //triangles[4].draw(sock);
  
    let g = new vec3([194, 250, 34]);
    triangles.push(new triangle(f, b, g));
    //triangles[5].draw(sock);
  
    let h = new vec3([248, 366, 188]);
    triangles.push(new triangle(g, h, e));
    //triangles[6].draw(sock);
  
    triangles.push(new triangle(g, e, f));
    //triangles[7].draw(sock);
  
    triangles.push(new triangle(h, a, d));
    //triangles[8].draw(sock);
  
    triangles.push(new triangle(h, d, e));
    //triangles[9].draw(sock);
  
    triangles.push(new triangle(g, b, a));
    //triangles[10].draw(sock);
  
    triangles.push(new triangle(g, a, h));
    // triangles[11].draw(sock);
  
    return triangles;
}

export {simpleCube}