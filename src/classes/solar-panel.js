export class SolarPanel {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = 0;
    this.dragging = false;
    this.rotating = false;
    this.selected = false;
    this.dragOffset = { x: 0, y: 0 };
  }

  draw(p) {
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.angle);
    p.stroke(this.selected ? "blue" : "black");
    p.fill(200, 100, 100, 150);
    p.rectMode(p.CENTER);
    p.rect(0, 0, this.w, this.h);
    p.pop();
  }

  isHovered(p) {
    const mx = p.mouseX - this.x;
    const my = p.mouseY - this.y;
    const rx = mx * Math.cos(-this.angle) - my * Math.sin(-this.angle);
    const ry = mx * Math.sin(-this.angle) + my * Math.cos(-this.angle);
    return (
      Math.abs(rx) < this.w / 2 &&
      Math.abs(ry) < this.h / 2 &&
      (Math.abs(Math.abs(rx) - this.w / 2) < 10 ||
        Math.abs(Math.abs(ry) - this.h / 2) < 10)
    );
  }

  isDragged(p) {
    const mx = p.mouseX - this.x;
    const my = p.mouseY - this.y;
    const rx = mx * Math.cos(-this.angle) - my * Math.sin(-this.angle);
    const ry = mx * Math.sin(-this.angle) + my * Math.cos(-this.angle);
    return Math.abs(rx) < this.w / 2 && Math.abs(ry) < this.h / 2;
  }

  onMousePressed(p) {
    if (this.isHovered(p)) {
      this.rotating = true;
    } else if (this.isDragged(p)) {
      this.dragging = true;
      this.dragOffset.x = p.mouseX - this.x;
      this.dragOffset.y = p.mouseY - this.y;
    }
  }

  onMouseDragged(p) {
    if (this.dragging) {
      this.x = p.mouseX - this.dragOffset.x;
      this.y = p.mouseY - this.dragOffset.y;
    } else if (this.rotating) {
      const dx = p.mouseX - this.x;
      const dy = p.mouseY - this.y;
      this.angle = Math.atan2(dy, dx);
    }
  }

  onMouseReleased() {
    this.dragging = false;
    this.rotating = false;
  }
}
