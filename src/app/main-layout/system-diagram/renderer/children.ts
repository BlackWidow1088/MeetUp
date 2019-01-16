import { componentTypeStr, ComponentVisualAppearanceDetails } from 'src/app/main-layout/system-diagram/util/componentVisualAppearance';
import { buildTooltipHtmlString, showTooltip, hideTooltip } from 'src/app/main-layout/system-diagram/decorator/tooltip';

const componentVisualAppearance = new ComponentVisualAppearanceDetails();

export function decorateNodeWithChild(svgNode, node, tooltipDiv, hasDiagramType): void {
  for (let i = 0; i < node.childrens.length; i++) {
    if (node.childrens[i].x) {
      svgNode.append('image')
        .attr('xlink:href', (d) => {
          if (d && node.id === d.id) {
            return componentVisualAppearance.getNodeDetails(node.childrens[i].model_number, componentTypeStr.image, node.subTypeKey);
          }
        })
        .attr('height', (d) => {
          if (d && node.id === d.id) {
            return node.childrens[i].height;
          }
        })
        .attr('width', (d) => {
          if (d && node.id === d.id) {
            return node.childrens[i].width;
          }
        })
        .attr('transform', (d) => {
          if (d && node.id === d.id) {
            return `translate(${node.childrens[i].x},${node.childrens[i].y})`;
          }
        })
        .attr('id', d => {
          if (d && node.id === d.id) {
            return node.childrens[i].id
          }
        })
        .attr('class', d => {
          if (d && node.id === d.id) {
            return `app-sd-node ${node.childrens[i].id.model_number} ${node.childrens[i].id['sub-type']}`
          }
        })
        .on('mousedown', () => hideTooltip(tooltipDiv))
        .on('mouseover', (d) => {
          if (d && node.id === d.id) {
            showTooltip(tooltipDiv, buildTooltipHtmlString(node.childrens[i], hasDiagramType))
          }
        })
        .on('mouseout', () => hideTooltip(tooltipDiv))
    }
  }
}
