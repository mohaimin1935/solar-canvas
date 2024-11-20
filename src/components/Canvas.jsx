const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const ORIGINAL_WIDTH = window.innerWidth;
const ORIGINAL_HEIGHT = window.innerHeight;
const dpr = window.devicePixelRatio || 1;
let canvasWidth = window.innerWidth * dpr;
let canvasHeight = (1 / ASPECT_RATIO) * canvasWidth;
let scaleSize = window.innerWidth / ORIGINAL_WIDTH;

import { ReactP5Wrapper } from "@p5-wrapper/react";
import { SolarPanel } from "../classes/solar-panel";

function sketch(p5) {
  let solarPanels = [];
  let activeSolarPanels = [];

  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight);
    p5.pixelDensity(Math.min(2, 1 / scaleSize));
    p5.angleMode(p5.DEGREES);
    p5.smooth();

    solarPanels.push(new SolarPanel(200, 200, 100, 50));
    solarPanels.push(new SolarPanel(400, 300, 120, 60));
  };

  p5.draw = () => {
    p5.background(160);
    p5.push();

    // draw here
    for (let panel of solarPanels) {
      panel.draw(p5);
    }

    p5.pop();
  };

  p5.mousePressed = () => {
    for (let panel of solarPanels) {
      panel.onMousePressed(p5);
      if (panel.isDragged(p5)) {
        panel.selected = !panel.selected;
        if (panel.selected) activeSolarPanels.push(panel);
        else activeSolarPanels = activeSolarPanels.filter((r) => r !== panel);
      }
    }
  };

  p5.mouseDragged = () => {
    for (let panel of solarPanels) {
      panel.onMouseDragged(p5);
    }
  };

  p5.mouseReleased = () => {
    for (let panel of solarPanels) {
      panel.onMouseReleased();
    }
  };
}

export const Canvas = () => {
  return <ReactP5Wrapper sketch={sketch} />;
};
