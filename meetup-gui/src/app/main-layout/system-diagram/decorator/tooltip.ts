import * as d3Select from 'd3-selection';

import { DiagramCategory } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { messages } from 'src/app/shared/utils/messages';
import { getMemoryUnit } from 'src/app/shared/utils/helper.util';
import { NodeTypes } from 'src/app/main-layout/system-diagram/decorator/node-types';

export function buildTooltipHtmlString(nodeData, hasDiagramType, rulesHover?): string {
  let htmlString = ``;
  const isVirtualization = (hasDiagramType !== DiagramCategory.systemDiagram);
  const objNodeTypesKeys = Object.keys(NodeTypes);

  if (
    objNodeTypesKeys.includes(nodeData['sub-type']) &&
    (hasDiagramType !== DiagramCategory.systemDiagram)
  ) {
    const nodeKeys = Object.keys(NodeTypes[`${nodeData['sub-type']}`]);
    htmlString = `<p class='header'>${nodeData.label} (${nodeData.type})</p>`;

    nodeKeys.forEach(element => {
      let value = nodeData[element];
      const node = NodeTypes[`${nodeData['sub-type']}`][element];
      if ( node && node.isSizeConvertible) {
        value = getMemoryUnit(value);
      }
      if (value && node && node.unit) {
        value = `${value} ${node.unit}`;
      }
      htmlString += `${getValue(node.display, value)}`;
    });
    return htmlString;
  } else if (nodeData && nodeData.label) {
    htmlString = `<p class='header'>${nodeData.label} (${nodeData.type})</p>`;
    if (rulesHover) {
      return htmlString += `${getMsg(`Pass`, nodeData.messages.pass)}${getMsg(`Fail`, nodeData.messages.fail)}${getMsg(`Warning`, nodeData.messages.warning)}`;
    }
    return htmlString += `${getValue(`Software version`, nodeData.software_version)}${getValue(`Model number`, nodeData.model_number)}${getValue(`Serial number`, nodeData.serial_number)}`;
  } else if (isVirtualization && nodeData.source && nodeData.target) {
    htmlString += `${getValue(`Source`, nodeData.source.label)}${getValue(`Target`, nodeData.target.label)}`;
  } else {
    htmlString += `${getMsg(`Pass`, nodeData.messages.pass)}${getMsg(`Fail`, nodeData.messages.fail)}${getMsg(`Warning`, nodeData.messages.warning)}`;
  }

  return htmlString;
}

export function getValue(string, value): string {
  return `<p class='content'>${string}: ${(value || value === 0) ? value : messages.na}</p>`;
}

export function getMsg(string, value): string {
  return `<p class='content'>${string}: ${value.length}</p>`;
}

export function showTooltip(tooltipDiv, htmlString): void {
  const windowObj = window;
  tooltipDiv.style('opacity', 1);
  const pageX = d3Select.event.pageX;
  const pageY = d3Select.event.pageY;
  const calcX = (pageX + tooltipDiv.node().offsetWidth > windowObj.innerWidth) ? pageX - tooltipDiv.node().offsetWidth : pageX
  const calcY = (pageY + tooltipDiv.node().offsetHeight > windowObj.innerHeight) ? pageY - tooltipDiv.node().offsetHeight : pageY;

  tooltipDiv.html(htmlString)
    .style('left', `${calcX}px`)
    .style('top', `${calcY}px`);
}

export function hideTooltip(tooltipDiv): void {
  tooltipDiv.style('opacity', 0);
}
