/**
 * if slot id is invalid or child does not have slot id as in case of FI, then it will not be displayed in sys diagram.
 */
export function plotChassis(nodes) {
  const width = 64, height = 16, xOffset = 2, yOffset = 1, xInit = 10, maxBladeCount = 8, even = 2;
  let x = xInit, y = 0;
  for (let i = 0; i < maxBladeCount; i++) {
    nodes.forEach(element => {
      if (element && element.slotId === i) {
        element.x = x;
        element.y = y;
      }
    });
    if (i % even === 0) {
      x += width + xOffset;
    } else {
      x = xInit;
      y += height - yOffset;
    }
  }
}

