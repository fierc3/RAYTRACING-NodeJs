import { vec3 } from "./RayTracingClasses.js";

class triangle {
  constructor(corner1, corner2, corner3, material = { r: 0, g: 0, b: 1 }) {
    if (corner1 && corner2 && corner3) {
      this.corner1 = new vec3(corner1);
      this.corner2 = new vec3(corner2);
      this.corner3 = new vec3(corner3);
      this.dirVec1 = this.corner2.sub(this.corner1);
      this.dirVec2 = this.corner3.sub(this.corner1);
      this.dirVec3 = this.corner3.sub(this.corner2);
      this.material = material;
    } else {
      alert("Triangle needs 3 corners");
    }
  }

  draw = (sock) => {
    const randR = Math.floor(Math.random() * 10) / 10;
    const randG = Math.floor(Math.random() * 10) / 10;
    const randB = Math.floor(Math.random() * 10) / 10;

    for (let lambda = 0; lambda <= 1; lambda += 0.001) {
      sock.pixel(
        this.corner1.x + lambda * this.dirVec1.x,
        this.corner1.y + lambda * this.dirVec1.y,
        randR,
        randG,
        randB
      );

      //console.log(randR, this.corner1.x + lambda * this.dirVec2.x, this.corner1.y + lambda * this.dirVec2.y)
      sock.pixel(
        this.corner1.x + lambda * this.dirVec2.x,
        this.corner1.y + lambda * this.dirVec2.y,
        randR,
        randG,
        randB
      );

      //console.log(randR, this.corner2.x + lambda * this.dirVec3.x, this.corner2.y + lambda * this.dirVec3.y)

      sock.pixel(
        this.corner2.x + lambda * this.dirVec3.x,
        this.corner2.y + lambda * this.dirVec3.y,
        randR,
        randG,
        randB
      );
    }
  };
}

export { triangle };
