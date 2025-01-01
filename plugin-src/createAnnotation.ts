const SUMMARY_BOX_WIDTH = 310;
const SUMMARY_BOX_HEIGHT = 92;

function rgb(r: number, g: number, b: number) {
  return { r: r / 255, g: g / 255, b: b / 255 };
}

enum AnnotationType {
  DO = "Do",
  DONT = "Don't",
  HESITATE = "Hesitate",
}

const UPPER_COLOR: Record<AnnotationType, ReturnType<typeof rgb>> = {
  [AnnotationType.DO]: rgb(0, 216, 112),
  [AnnotationType.DONT]: rgb(255, 55, 55),
  [AnnotationType.HESITATE]: rgb(248, 207, 62),
};

type AnnotationData = {
  type: AnnotationType;
  title: string;
  description: string;
};

export async function createAnnotation(annotationData: AnnotationData) {
  const nodes: SceneNode[] = [];

  const box = createBox();
  nodes.push(box);

  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  let startX = box.x;
  let startY = box.y;

  // =================
  const dividerColor = UPPER_COLOR[annotationData.type] || rgb(0, 0, 0);

  const divider1 = createDivider({
    x: startX,
    y: startY,
    color: dividerColor,
  });
  startX = divider1.x + 16;
  startY = divider1.y + divider1.height + 16;
  nodes.push(divider1);

  // =====================

  const title = createAnnotationTitle({
    x: startX,
    y: startY,
    text: annotationData.title,
  });
  startY = title.y + title.height + 8;
  nodes.push(title);

  // =====================

  const description = await createDescription({
    x: startX,
    y: startY,
    text: annotationData.description,
  });

  startY = description.y + description.height + 16;
  nodes.push(description);

  // =====================

  nodes.forEach((node) => {
    figma.currentPage.appendChild(node);
  });

  // Adjust container height dynamically
  const textBottomEdge = startY; // Add padding
  const newBoxHeight = Math.max(SUMMARY_BOX_HEIGHT, textBottomEdge - box.y);

  box.resize(SUMMARY_BOX_WIDTH, newBoxHeight);

  const group = figma.group(nodes, figma.currentPage);
  group.name = `Summary Group`;

  figma.currentPage.selection = nodes;
}

function createDivider({ x, y, color }: { x: number; y: number; color: RGB }) {
  const divider = figma.createRectangle();
  divider.resize(SUMMARY_BOX_WIDTH, 8);
  divider.fills = [{ type: "SOLID", color }];
  divider.x = x;
  divider.y = y;
  return divider;
}

function createBox() {
  const viewportCenter = figma.viewport.center;

  const box = figma.createRectangle();

  box.x = viewportCenter.x - SUMMARY_BOX_WIDTH / 2;
  box.y = viewportCenter.y - SUMMARY_BOX_HEIGHT / 2;

  box.resize(SUMMARY_BOX_WIDTH, SUMMARY_BOX_HEIGHT);
  box.fills = [{ type: "SOLID", color: rgb(255, 255, 255) }];
  box.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.3 },
      offset: { x: 0, y: 2 },
      radius: 2,
      visible: true,
      blendMode: "NORMAL",
    },
  ];

  return box;
}

function createAnnotationTitle({
  x,
  y,
  text,
}: {
  x: number;
  y: number;
  text: string;
}) {
  const summary = figma.createText();
  summary.fontName = { family: "Inter", style: "Bold" };
  summary.characters = text;
  summary.fontSize = 20;
  summary.lineHeight = { value: 24, unit: "PIXELS" };
  summary.letterSpacing = { value: -4, unit: "PERCENT" };
  summary.fills = [{ type: "SOLID", color: rgb(22, 22, 29) }];
  summary.x = x;
  summary.y = y;

  summary.textAutoResize = "WIDTH_AND_HEIGHT";
  summary.resize(278, summary.height);

  return summary;
}

async function createDescription({
  text,
  x,
  y,
}: {
  text: string;
  x: number;
  y: number;
}) {
  const summaryText = figma.createText();

  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  summaryText.fontName = { family: "Inter", style: "Regular" };

  summaryText.characters = text;
  summaryText.fontSize = 14;
  summaryText.lineHeight = { value: 20, unit: "PIXELS" };
  summaryText.letterSpacing = { value: -2, unit: "PERCENT" };
  summaryText.fills = [{ type: "SOLID", color: rgb(73, 73, 90) }];
  summaryText.x = x;
  summaryText.y = y;

  // Set auto wrapping and width
  summaryText.textAutoResize = "WIDTH_AND_HEIGHT";
  summaryText.resize(278, summaryText.height);

  return summaryText;
}
