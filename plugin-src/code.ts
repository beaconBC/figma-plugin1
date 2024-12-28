import { createBox1 } from "./createBox1";
import createRectangles from "./createRectangles";

figma.showUI(__html__, { themeColors: true, width: 300, height: 500 });

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case "create-rectangles":
      createRectangles(msg.count);
      break;
    case "create-box1":
      createBox1(msg.summaryText);
      break;
    case "cancel":
      figma.closePlugin();
      break;
  }
};
