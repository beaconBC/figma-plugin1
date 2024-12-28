const SUMMARY_BOX_WIDTH = 440;
const SUMMARY_BOX_HEIGHT = 226;

function rgb(r: number, g: number, b: number) {
  return { r: r / 255, g: g / 255, b: b / 255 };
}

export async function createBox1(text: string) {
  const nodes: SceneNode[] = [];

  // Create the black box
  const box = figma.createRectangle();
  box.resize(SUMMARY_BOX_WIDTH, SUMMARY_BOX_HEIGHT);
  box.fills = [{ type: "SOLID", color: rgb(0, 0, 0) }];
  figma.currentPage.appendChild(box);
  nodes.push(box);

  // // Create the title text
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const title = figma.createText();
  title.fontName = { family: "Inter", style: "Bold" };

  title.characters = "참고";
  title.fontSize = 44;

  title.fills = [{ type: "SOLID", color: rgb(255, 255, 255) }];
  title.x = box.x + 24;
  title.y = box.y + 24;

  figma.currentPage.appendChild(title);
  nodes.push(title);

  const dateData = new Date();
  const date = figma.createText();
  date.fontName = { family: "Inter", style: "Bold" };
  date.characters = `${
    dateData.getFullYear() % 100
  }.${dateData.getMonth()}.${dateData.getDate()}`;

  date.fontSize = 19;
  date.fills = [{ type: "SOLID", color: rgb(198, 198, 212) }];
  date.x = box.x + 24;
  date.y = title.y + 44 + 14;
  figma.currentPage.appendChild(date);
  nodes.push(date);

  const divider = figma.createRectangle();
  divider.resize(392, 1);
  divider.fills = [{ type: "SOLID", color: rgb(255, 255, 255) }];
  divider.x = box.x + 24;
  divider.y = date.y + 47;
  figma.currentPage.appendChild(divider);
  nodes.push(divider);

  const summary = figma.createText();
  summary.fontName = { family: "Inter", style: "Bold" };
  summary.characters = "Summary";
  summary.fontSize = 18;
  summary.fills = [{ type: "SOLID", color: rgb(255, 255, 255) }];
  summary.x = box.x + 24;
  summary.y = divider.y + 25;
  figma.currentPage.appendChild(summary);
  nodes.push(summary);

  const summaryText = figma.createText();
  summaryText.fontName = { family: "Inter", style: "Bold" };
  summaryText.characters = text;
  summaryText.fontSize = 18;
  summaryText.fills = [{ type: "SOLID", color: rgb(255, 255, 255) }];
  summaryText.x = box.x + 24;
  summaryText.y = summary.y + 25;

  // Set auto wrapping and width
  summaryText.textAutoResize = "WIDTH_AND_HEIGHT";
  summaryText.resize(392, summaryText.height);

  figma.currentPage.appendChild(summaryText);
  nodes.push(summaryText);

  // Adjust container height dynamically
  const textBottomEdge = summaryText.y + summaryText.height + 24; // Add padding
  const newBoxHeight = Math.max(SUMMARY_BOX_HEIGHT, textBottomEdge - box.y);

  box.resize(SUMMARY_BOX_WIDTH, newBoxHeight);

  const group = figma.group(nodes, figma.currentPage);
  group.name = "Summary Group";

  figma.currentPage.selection = nodes;
}
