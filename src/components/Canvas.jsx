const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const ORIGINAL_WIDTH = window.innerWidth;
const ORIGINAL_HEIGHT = window.innerHeight;
const dpr = window.devicePixelRatio || 1;
const TOOLBAR_OFFSET = 50;

let canvasWidth = window.innerWidth;
let canvasHeight = (1 / ASPECT_RATIO) * canvasWidth;
let scaleSize = window.innerWidth / ORIGINAL_WIDTH;

let referencePanel = null;

import { ReactP5Wrapper } from "@p5-wrapper/react";
import { SolarPanel } from "../classes/solar-panel";
import { useState } from "react";
import { Toolbar } from "./toolbar";
import { Sidebar } from "./SideBar";
import { cn } from "../lib/utils";

const panels = [
  {
    name: "panel 1",
    description: "panel 1 ...",
    power: 50,
    size: { w: 50, h: 80 },
    img: "./images/solar-panel.png",
  },
  {
    name: "panel 2",
    description: "panel 2 ...",
    power: 40,
    size: { w: 60, h: 100 },
    img: "./images/solar-panel.png",
  },
];

export const Canvas = () => {
  const [mode, setMode] = useState("select");
  const [solarPanels, setSolarPanels] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState(null);

  const handleModeChange = (newMode) => {
    setSelectedPanel(null);
    setMode(newMode);
  };

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(window.innerWidth - 120, window.innerHeight);
      p.pixelDensity(Math.min(2, 1 / scaleSize));
      p.angleMode(p.DEGREES);
      p.smooth();
    };

    p.draw = () => {
      p.background(155);

      for (const panel of solarPanels) {
        panel.draw(p);
      }

      if (mode === "copy") {
        for (const panel of solarPanels) {
          if (panel.checkAdjacent(p)) {
            referencePanel = panel;
            break;
          }
        }
      }

      if (mode === "copying") {
        referencePanel?.showCopiedPanels(p);
      }
    };

    p.mousePressed = () => {
      if (selectedPanel !== null) {
        if (p.mouseX < TOOLBAR_OFFSET) return;
        const panel = new SolarPanel(p, panels[selectedPanel]);
        setSolarPanels((panels) => [...panels, panel]);
      }

      if (mode === "copy") {
        setMode("copying");
      }

      if (mode === "copying") {
        referencePanel?.addCopiedPanels(p, setSolarPanels);
        setMode("copy");
      }
    };
  };

  return (
    <div
      className={cn(
        "h-screen w-full overflow-hidden relative",
        selectedPanel !== null && "cursor-cell",
        mode === "copying" && "cursor-copy"
      )}
    >
      <div className="flex">
        <Toolbar mode={mode} setMode={handleModeChange} />
        <ReactP5Wrapper sketch={sketch} />
      </div>

      <Sidebar
        panels={panels}
        selectedPanel={selectedPanel}
        setSelectedPanel={setSelectedPanel}
      />
    </div>
  );
};
