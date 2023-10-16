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
    for (let lambda = 0; lambda <= 1; lambda += 0.01) {
      //sock.secureSend("p " + r.xCoord() + " " + r.yCoord() + " " + 1 + " " + 0.5 + "0\r\n");
      const command =
        "p " +
        (this.corner1.x +
        lambda * this.dirVec1.x) +
        " " +
        (this.corner1.y +
        lambda * this.dirVec1.y) +
        " " +
        this.corner1.z +
        lambda * this.dirVec1.z +
        " 1 1 1";

      console.log(command);
      sock.pixel(
        this.corner1.x +
        lambda * this.dirVec1.x ,
        this.corner1.y +
          lambda * this.dirVec1.y ,
          this.corner1.z +
          lambda * this.dirVec1.z,
        1,
        1,
        1
      );

      sock.pixel(
        this.corner1.x +
        lambda * this.dirVec2.x ,
        this.corner1.y +
          lambda * this.dirVec2.y ,
          this.corner1.z +
          lambda * this.dirVec2.z,
        1,
        1,
        1
      );

      sock.pixel(
        this.corner2.x +
        lambda * this.dirVec3.x ,
        this.corner2.y +
          lambda * this.dirVec3.y ,
          this.corner2.z +
          lambda * this.dirVec3.z,
        1,
        1,
        1
      );
    }
  };
}

export { triangle };
