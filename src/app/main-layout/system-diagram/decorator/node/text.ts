import {
  buildTooltipHtmlString, hideTooltip, showTooltip
} from 'src/app/main-layout/system-diagram/decorator/tooltip';
import * as d3Select from 'd3-selection';

import { Router } from '@angular/router';

export class DecorateNodeWithErrorContent {
  constructor(
    private router: Router
  ) { }
  showTextHtml = (svgNode, tooltipDiv, hasDiagramType): any => {
    svgNode
      .append('text')
      .text(this.rulesCount)
      .attr('id', this.returnId)
      .attr('class', 'app-failed-count app-cursor-pointer')
      .attr('text-anchor', 'middle')
      .attr('x', this.setTextPosition)
      .attr('y', -4)
      .style('fill', 'white')
      .on('click', this.handleNavigation)
      .on('mousedown', () => hideTooltip(tooltipDiv))
      .on('mouseover', (node) => showTooltip(tooltipDiv, buildTooltipHtmlString(node, hasDiagramType, true)))
      .on('mouseout', () => hideTooltip(tooltipDiv));
    return svgNode;
  }
  rulesCount = (node) => {
    return node.messages && node.messages['fail'] && node.messages['fail'].length ? `${node.messages['fail'].length}` : ``;
  }
  returnId = (node) => {
    return `app-failed-${node.typeKey}`;
  }
  setTextPosition = (node) => {
    return node.width - 8;
  }
  handleNavigation = (node) => {
    if (d3Select.event) {
      d3Select.event.stopPropagation();
    }
    const routeUrl = this.router.url.split('/');
    const routeTo = [`/main-layout/${node.typeKey}/${node.typeKey}landing/${routeUrl[routeUrl.length - 2]}/${routeUrl[routeUrl.length - 1]}`];
    this.router.navigate(routeTo, {
      queryParams: {
        ruleResult: 'Fail',
        deviceName: node.label
      }
    });
  }
}
