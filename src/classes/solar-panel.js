const PADDING = 10

export class SolarPanel {
  constructor(p, panel) {
    this.name = panel.name;
    this.description = panel.description;
    this.power = panel.power;
    this.size = panel.size;
    this.img = panel.img

    this.position = p.createVector(p.mouseX, p.mouseY)
    this.angle = 0;
    this.isSelected = false
  }

  setPosition(position) {
    this.position = position;
  }

  draw(p) {
    p.push();
    p.translate(this.position.x, this.position.y);
    p.rotate((this.angle * Math.PI) / 180); // Convert angle to radians for p5 rotation
    p.stroke(this.isSelected ? "blue" : "black");
    p.fill(200, 100, 100, 150);
    p.rect(0, 0, this.size.w, this.size.h);
    p.pop();
  } 

  checkAdjacent(p) {

    let x = this.position.x
    let y = this.position.y
    let w = this.size.w
    let h = this.size.h
    let pa = PADDING

    const bounds = [
      {
        left: x - w - pa,
        right: x - pa,
        top: y,
        bottom: y + h,
      }, 
      {
        left: x + w + pa,
        right: x + 2*w + pa,
        top: y,
        bottom: y + h,
      }, 
      {
        left: x,
        right: x + w,
        top: y + h + pa,
        bottom: y + 2*h + pa,
      }, 
      {
        left: x,
        right: x + w,
        top: y - pa - h,
        bottom: y - pa,
      }, 
    ]

    for (let bound of bounds) {

      // TODO: check adjacent is empty
      
      if (p.mouseX > bound.left && p.mouseX < bound.right && p.mouseY < bound.bottom && p.mouseY > bound.top) {
        this.drawGuidedPanel(p, bound.left, bound.top, this.size.w, this.size.h, 0)

        return true
      }

    }

    return false
  }

  showCopiedPanels(p) {

    if (p.mouseX <= 10 || p.mouseY <= 10) return

    let mx = p.mouseX
    let my = p.mouseY
    let w = this.size.w
    let h = this.size.h
    let x = this.position.x
    let y = this.position.y
    let pa = PADDING


    // bottom-right
    if (mx > x && my > y) {
      let nx = Math.ceil((mx - x + pa) / (w + pa))
      let ny = Math.ceil((my - y + pa) / (h + pa))

      for (let i = 1; i <= ny; i++) {
        for (let j = 1; j <= nx; j++) {
          if (i === 1 && j === 1) continue
          
          this.drawGuidedPanel(p, x + (j-1) * (w + pa), y + (i-1) * (h + pa), w, h, 0)
        }
      }
    }

    // bottom-left
    if (mx < x && my > y) {
      let nx = Math.ceil(( x - mx) / (w + pa))
      let ny = Math.ceil((my - y + pa) / (h + pa))

      for (let i = 1; i <= ny; i++) {
        for (let j = 1; j <= nx+1; j++) {
          if (i === 1 && j === 1) continue
          
          this.drawGuidedPanel(p, x - (j-1) * (w + pa), y + (i-1) * (h + pa), w, h, 0)
        }
      }
    }

    // top-right
    if (mx > x && my < y) {
      let nx = Math.ceil((mx - x + pa) / (w + pa))
      let ny = Math.ceil((y - my) / (h + pa))

      for (let i = 1; i <= ny+1; i++) {
        for (let j = 1; j <= nx; j++) {
          if (i === 1 && j === 1) continue
          
          this.drawGuidedPanel(p, x + (j-1) * (w + pa), y - (i-1) * (h + pa), w, h, 0)
        }
      }
    }

    // top-left
    if (mx < x && my < y) {
      let nx = Math.ceil((x - mx) / (w + pa))
      let ny = Math.ceil((y - my) / (h + pa))

      for (let i = 1; i <= ny+1; i++) {
        for (let j = 1; j <= nx+1; j++) {
          if (i === 1 && j === 1) continue
          
          this.drawGuidedPanel(p, x - (j-1) * (w + pa), y - (i-1) * (h + pa), w, h, 0)
        }
      }
    }

  }

  addCopiedPanels(p, setSolarPanels) {
    let mx = p.mouseX
    let my = p.mouseY
    let w = this.size.w
    let h = this.size.h
    let x = this.position.x
    let y = this.position.y
    let pa = PADDING

    
    // bottom-right
    if (mx > x && my > y) {
      let nx = Math.ceil((mx - x + pa) / (w + pa))
      let ny = Math.ceil((my - y + pa) / (h + pa))

      for (let i = 1; i <= ny; i++) {
        for (let j = 1; j <= nx; j++) {
          if (i === 1 && j === 1) continue

          let panel = new SolarPanel(p, this)
          panel.setPosition(p.createVector(x + (j-1) * (w + pa), y + (i-1) * (h + pa))) 
          setSolarPanels(panels => [...panels, panel]) 
        }
      }
    }

    // bottom-left
    if (mx < x && my > y) {
      let nx = Math.ceil(( x - mx) / (w + pa))
      let ny = Math.ceil((my - y + pa) / (h + pa))

      for (let i = 1; i <= ny; i++) {
        for (let j = 1; j <= nx+1; j++) {
          if (i === 1 && j === 1) continue
          
          let panel = new SolarPanel(p, this)
          panel.setPosition(p.createVector(x - (j-1) * (w + pa), y + (i-1) * (h + pa)))
          setSolarPanels(panels => [...panels, panel]) 
        }
      }
    }

    // top-right
    if (mx > x && my < y) {
      let nx = Math.ceil((mx - x + pa) / (w + pa))
      let ny = Math.ceil((y - my) / (h + pa))

      for (let i = 1; i <= ny+1; i++) {
        for (let j = 1; j <= nx; j++) {
          if (i === 1 && j === 1) continue
          
          let panel = new SolarPanel(p, this)
          panel.setPosition(p.createVector(x + (j-1) * (w + pa), y - (i-1) * (h + pa)))
          setSolarPanels(panels => [...panels, panel]) 
        }
      }
    }

    // top-left
    if (mx < x && my < y) {
      let nx = Math.ceil((x - mx) / (w + pa))
      let ny = Math.ceil((y - my) / (h + pa))

      for (let i = 1; i <= ny+1; i++) {
        for (let j = 1; j <= nx+1; j++) {
          if (i === 1 && j === 1) continue
          
          let panel = new SolarPanel(p, this)
          panel.setPosition(p.createVector(x - (j-1) * (w + pa), y - (i-1) * (h + pa)))
          setSolarPanels(panels => [...panels, panel]) 
        }
      }
    }

    
  }

  drawGuidedPanel(p, x, y, w, h, angle) {
    p.push();
    p.translate(x, y);
    p.rotate((angle * Math.PI) / 180); // Convert angle to radians for p5 rotation
    // p.stroke(this.isSelected ? "blue" : "black");
    p.stroke("green")
    p.fill(200, 100, 100, 50);
    p.rect(0, 0, w, h);
    p.pop();
  }
}
