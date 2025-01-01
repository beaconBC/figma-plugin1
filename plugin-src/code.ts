import { createSummary } from "./createSummary";
import createRectangles from "./createRectangles";
import { createAnnotation } from "./createAnnotation";

figma.showUI(__html__, { themeColors: true, width: 320, height: 500 });

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case "create-rectangles":
      createRectangles(msg.count);
      break;
    case "create-summary":
      createSummary(msg.summaryData);
      break;
    case "cancel":
      figma.closePlugin();
      break;
    case "create-annotation":
      createAnnotation(msg.annotationData);
      break;
  }
};
