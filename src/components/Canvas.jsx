const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const ORIGINAL_WIDTH = window.innerWidth;
const ORIGINAL_HEIGHT = window.innerHeight;
const dpr = window.devicePixelRatio || 1;
let canvasWidth = window.innerWidth * dpr;
let canvasHeight = (1 / ASPECT_RATIO) * canvasWidth;
let scaleSize = window.innerWidth / ORIGINAL_WIDTH;

import { ReactP5Wrapper } from "@p5-wrapper/react";
import { SolarPanel } from "../classes/solar-panel";
import { useState } from "react";
import { Toolbar } from "./toolbar";

// function sketch(p5) {
//   let solarPanels = [];
//   let activeSolarPanels = [];

//   p5.setup = () => {
//     p5.createCanvas(canvasWidth, canvasHeight);
//     p5.pixelDensity(Math.min(2, 1 / scaleSize));
//     p5.angleMode(p5.DEGREES);
//     p5.smooth();

//     solarPanels.push(new SolarPanel(200, 200, 100, 50));
//     solarPanels.push(new SolarPanel(400, 300, 120, 60));
//   };

//   p5.draw = () => {
//     p5.background(160);
//     p5.push();

//     // draw here
//     for (let panel of solarPanels) {
//       panel.draw(p5);
//     }

//     p5.pop();
//   };

//   p5.mousePressed = () => {
//     for (let panel of solarPanels) {
//       panel.onMousePressed(p5);
//       if (panel.isDragged(p5)) {
//         panel.selected = !panel.selected;
//         if (panel.selected) activeSolarPanels.push(panel);
//         else activeSolarPanels = activeSolarPanels.filter((r) => r !== panel);
//       }
//     }
//   };

//   p5.mouseDragged = () => {
//     for (let panel of solarPanels) {
//       panel.onMouseDragged(p5);
//     }
//   };

//   p5.mouseReleased = () => {
//     for (let panel of solarPanels) {
//       panel.onMouseReleased();
//     }
//   };
// }

export const Canvas = () => {
  const [mode, setMode] = useState("select");
  const [solarPanels, setSolarPanels] = useState([]);
  const [lineStart, setLineStart] = useState(null);
  const panelWidth = 100;
  const panelHeight = 50;
  const panelPadding = 20;

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.pixelDensity(Math.min(2, 1 / scaleSize));
      p.angleMode(p.DEGREES);
      p.smooth();
    };

    p.draw = () => {
      p.background(200);
      solarPanels.forEach((panel) => panel.draw(p));

      if (mode === "add" && lineStart) {
        p.stroke(0, 0, 255);
        p.line(lineStart.x, lineStart.y, p.mouseX, p.mouseY);
      }
    };

    p.mousePressed = () => {
      if (mode === "select") {
        solarPanels.forEach((panel) => panel.onMousePressed(p));
      } else if (mode === "add") {
        setLineStart({ x: p.mouseX, y: p.mouseY });
      }
    };

    p.mouseDragged = () => {
      if (mode === "select") {
        solarPanels.forEach((panel) => panel.onMouseDragged(p));
      }
    };

    p.mouseReleased = () => {
      if (mode === "select") {
        solarPanels.forEach((panel) => panel.onMouseReleased());
      } else if (mode === "add" && lineStart) {
        const dx = p.mouseX - lineStart.x;
        const dy = p.mouseY - lineStart.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const numPanels = Math.floor(distance / (panelWidth + panelPadding));

        const newPanels = [];
        for (let i = 0; i < numPanels; i++) {
          const offsetX =
            lineStart.x + i * (panelWidth + panelPadding) * Math.cos(angle);
          const offsetY =
            lineStart.y + i * (panelWidth + panelPadding) * Math.sin(angle);
          newPanels.push(
            new SolarPanel(
              offsetX,
              offsetY,
              panelWidth,
              panelHeight,
              (angle * 180) / Math.PI
            )
          );
        }

        setSolarPanels([...solarPanels, ...newPanels]);
        setLineStart(null);
      }
    };
  };

  return (
    <div>
      <Toolbar mode={mode} setMode={setMode} />
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};
