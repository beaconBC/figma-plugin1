import { SummaryRequestData } from "../ui-src/Summary/Summary.type";

const SUMMARY_BOX_WIDTH = 440;
const SUMMARY_BOX_HEIGHT = 126;

function rgb(r: number, g: number, b: number) {
  return { r: r / 255, g: g / 255, b: b / 255 };
}

export async function createSummary(summaryData: SummaryRequestData) {
  const nodes: SceneNode[] = [];

  const box = createBox();
  nodes.push(box);

  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const startX = box.x + 24;
  let startY = box.y + 24;

  if (summaryData.title) {
    const title = createTitle({
      titleText: summaryData.title,
      x: startX,
      y: startY,
    });
    startY = title.y + title.height + 8;
    nodes.push(title);
  }

  const date = createDate({
    x: startX,
    y: startY,
  });
  startY = date.y + 47;
  nodes.push(date);

  if (summaryData.summary) {
    const divider1 = createDivider({
      x: startX,
      y: startY,
    });
    startY = divider1.y + 25;
    nodes.push(divider1);

    const summary = createSummaryTitle({
      x: startX,
      y: startY,
      text: "Summary",
    });
    startY = summary.y + 25;
    nodes.push(summary);

    const summaryText = createSummaryText({
      text: summaryData.summary,
      x: startX,
      y: startY,
    });
    startY = summaryText.y + 47;
    nodes.push(summaryText);
  }

  if (summaryData.description) {
    const divider2 = createDivider({
      x: startX,
      y: startY,
    });
    startY = divider2.y + 25;
    nodes.push(divider2);

    const description = createSummaryTitle({
      x: startX,
      y: startY,
      text: "Description",
    });
    startY = description.y + 25;
    nodes.push(description);

    const descriptionText = createSummaryText({
      text: summaryData.description,
      x: startX,
      y: startY,
    });
    startY = descriptionText.y + descriptionText.height + 24;
    nodes.push(descriptionText);
  }

  nodes.forEach((node) => {
    figma.currentPage.appendChild(node);
  });

  // Adjust container height dynamically
  const textBottomEdge = startY; // Add padding
  const newBoxHeight = Math.max(SUMMARY_BOX_HEIGHT, textBottomEdge - box.y);

  box.resize(SUMMARY_BOX_WIDTH, newBoxHeight);

  const group = figma.group(nodes, figma.currentPage);
  group.name = `Summary Group`;
}

function createBox() {
  const viewportCenter = figma.viewport.center;

  const box = figma.createRectangle();

  box.x = viewportCenter.x - SUMMARY_BOX_WIDTH / 2;
  box.y = viewportCenter.y - SUMMARY_BOX_HEIGHT / 2;

  box.resize(SUMMARY_BOX_WIDTH, SUMMARY_BOX_HEIGHT);
  box.fills = [{ type: "SOLID", color: rgb(0, 0, 0) }];
  return box;
}

function createTitle({
  titleText,
  x,
  y,
}: {
  titleText: string;
  x: number;
  y: number;
}) {
  const title = figma.createText();
  title.fontName = { family: "Inter", style: "Bold" };
  title.characters = titleText;
  title.fontSize = 44;
  title.lineHeight = { value: 44, unit: "PIXELS" };

  title.fills = [{ type: "SOLID", color: rgb(255, 255, 255) }];
  title.x = x;
  title.y = y;
  return title;
}

function createDate({
  x,
  y,
  date = new Date(),
}: {
  x: number;
  y: number;
  date?: Date;
}) {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const dateNode = figma.createText();
  dateNode.fontName = { family: "Inter", style: "Bold" };
  dateNode.characters = `${date.getFullYear() % 100}.${month}.${day}`;
  dateNode.fontSize = 19;
  dateNode.fills = [{ type: "SOLID", color: rgb(198, 198, 212) }];
  dateNode.x = x;
  dateNode.y = y;

  return dateNode;
}

function createDivider({ x, y }: { x: number; y: number }) {
  const divider = figma.createRectangle();
  divider.resize(392, 1);
  divider.fills = [{ type: "SOLID", color: rgb(255, 255, 255) }];
  divider.x = x;
  divider.y = y;
  return divider;
}

function createSummaryTitle({
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
  summary.fontSize = 18;
  summary.fills = [{ type: "SOLID", color: rgb(255, 255, 255) }];
  summary.x = x;
  summary.y = y;
  return summary;
}

function createSummaryText({
  text,
  x,
  y,
}: {
  text: string;
  x: number;
  y: number;
}) {
  const summaryText = figma.createText();
  summaryText.fontName = { family: "Inter", style: "Bold" };
  summaryText.characters = text;
  summaryText.fontSize = 18;
  summaryText.fills = [{ type: "SOLID", color: rgb(198, 198, 212) }];
  summaryText.x = x;
  summaryText.y = y;

  // Set auto wrapping and width
  summaryText.textAutoResize = "WIDTH_AND_HEIGHT";
  summaryText.resize(392, summaryText.height);

  return summaryText;
}
