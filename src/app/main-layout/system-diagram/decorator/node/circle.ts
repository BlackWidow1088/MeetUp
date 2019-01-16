import { buildTooltipHtmlString, hideTooltip, showTooltip } from 'src/app/main-layout/system-diagram/decorator/tooltip';

export function decorateNodeWithErrorWrapper(svgNode, tooltipDiv, hasDiagramType) {
  svgNode
    .append('circle')
    .attr('cx', function (d) {
      return d.width - 8;
    })
    .attr('cy', -8)
    .attr('r', 8)
    .attr('id', node => node.id)
    .attr('class', node => `app-sd-node ${node.model_number} ${node['sub-type']}`)
    .style('fill', '#FF4548')
    .style('display', (d) => d.messages && d.messages['fail'] && d.messages['fail'].length ? 'inline' : 'none')
    .on('mousedown', () => hideTooltip(tooltipDiv))
    .on('mouseover', (node) => showTooltip(tooltipDiv, buildTooltipHtmlString(node, hasDiagramType, true)))
    .on('mouseout', () => hideTooltip(tooltipDiv))
}
