import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

class Animation {
  constructor() {
    this.draggableChatBox();
  }

  draggableChatBox() {
    Draggable.create(".chat-box", {
      type: "x,y",
      bounds: document.querySelector(".chat-box-area"),
      inertia: true,
      onDragEnd: function (e) {
        if (this.hitTest(document.querySelector(".chat-box-area"), "10%")) {
          console.log("Hit");
          gsap.to(this.target, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      },
    });
  }
}

export default new Animation();
