import {
  ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

import * as d3ContextMenu from 'd3-context-menu';
import * as d3Drag from 'd3-drag';
import * as d3Select from 'd3-selection';
import * as d3Shape from 'd3-shape';
import * as d3Zoom from 'd3-zoom';
import { Subscription } from 'rxjs';

import { decorateNodeWithErrorWrapper } from 'src/app/main-layout/system-diagram/decorator/node/circle';
import { labelPosition, NodeLabel } from 'src/app/main-layout/system-diagram/decorator/node/node-label';
import { DecorateNodeWithErrorContent } from 'src/app/main-layout/system-diagram/decorator/node/text';
import { buildTooltipHtmlString, hideTooltip, showTooltip } from 'src/app/main-layout/system-diagram/decorator/tooltip';
import { decorateNodeWithChild } from 'src/app/main-layout/system-diagram/renderer/children';
import { GroupRenderer } from 'src/app/main-layout/system-diagram/renderer/group-renderer';
import { NodeContextMenu } from 'src/app/main-layout/system-diagram/renderer/node-context-menu';
import { D3Service } from 'src/app/main-layout/system-diagram/services/d3Service.service';
import { GridLayoutService } from 'src/app/main-layout/system-diagram/services/grid-layout.service';
import { SystemDiagramDataService,
  wrapperNodes, DiagramCategory } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { SystemDiagramOptions } from 'src/app/main-layout/system-diagram/system-diagram.component';
import { ToolTypeStr } from 'src/app/main-layout/system-diagram/toolbar/toolbar.types';
import {
  componentTypeStr, ComponentVisualAppearanceDetails, NodeSubTypeKey,
} from 'src/app/main-layout/system-diagram/util/componentVisualAppearance';

export const protocolBasedLinkColor = {
  'Ethernet': {
    colorCode: '#01ADBD',
    colorClass: 'green'
  },
  'FCoE': {
    colorCode: '#C66900',
    colorClass: 'yellow'
  },
  'FC': {
    colorCode: '#0072D9',
    colorClass: 'purple'
  },
  'Missing Connection': {
    colorCode: '#B1B3BE',
    colorClass: 'gray'
  },
  undefined: {
    colorCode: '#01ADBD',
    colorClass: 'green'
  }
}

const initialZoom = {
  x: 0,
  y: 0,
  k: 1,
  scale: 100
}

@Component({
  selector: 'app-system-diagram-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RendererComponent implements OnInit, OnDestroy {

  @ViewChild('fpSystemGraph') graph: ElementRef;
  @Input() systemDiagramOptions: SystemDiagramOptions;

  data: any;
  getDataSubscriber = new Subscription();
  legendSubscriber = new Subscription();
  decorateNodeWithErrorContent = new DecorateNodeWithErrorContent(this.router);
  groupRenderer = new GroupRenderer();

  showLegend: boolean = true;
  zoomLevel = initialZoom;
  zoomSVG;
  private connectingPoints: any = [];
  private componentVisualAppearance = new ComponentVisualAppearanceDetails();
  private nodeLabel = new NodeLabel();
  private protocolLinks = new Set();
  private tooltipDiv = d3Select.select('body').append('div')
    .attr('class', 'app-system-diagram-tooltip');

  constructor(
    private d3Service: D3Service,
    private router: Router,
    private gridLayoutService: GridLayoutService,
    private systemDiagramDataService: SystemDiagramDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.showLegend = this.systemDiagramOptions.tools.includes(ToolTypeStr.legend);
    this.legendSubscriber = this.systemDiagramDataService.getLegends()
      .subscribe(response => {
        this.showLegend = response;
      });

    this.getDataSubscriber = this.systemDiagramDataService.getData().subscribe(response => {
      if (response) {
        this.protocolLinks.clear();
        this.data = response;
        this.drawSystemDiagram();
        this.changeDetectorRef.detectChanges();
      }
    }, error => {
      // TODO: log errors
    });
  }

  ngOnDestroy() {
    d3Select.select('.app-system-diagram-tooltip').remove();
    this.getDataSubscriber.unsubscribe();
  }

  drawSystemDiagram = (): void => {
    const fpListBottom = 'app-list-bottom';
    const fpZoomValue = 'app-zoom-value';
    d3Select.select(`#graphSvg > svg`).remove();
    d3Select.select(`#graphSvg > .${fpListBottom}`).remove();
    // generate (x,y) for all nodes
    this.gridLayoutService.initializeNodes(this.data, this.systemDiagramOptions.hasDiagramType);

    const zoom = d3Zoom.zoom()
      .scaleExtent([this.systemDiagramOptions.initialZoomLevel, 2])
      .on('zoom', () => {
        const currentTransform = d3Select.event.transform;
        container.attr('transform', currentTransform);
        slider.property('value', currentTransform.k);
        this.d3Service.zoom(currentTransform);
        this.zoomLevel = currentTransform;
        d3Select.select(`#${fpZoomValue}`)
          .text(this.calculateScale(this.zoomLevel.k));
      })

    const slider = d3Select.select(this.graph.nativeElement)
      .append('ul')
      .attr('id', `app-zoom-slider`)
      .attr('class', `${fpListBottom}`)
      .append('li')
      .append('input')
      .attr('class', 'app-input-range-vertical')
      .datum({})
      .attr('type', 'range')
      .attr('value', 1)
      .attr('min', zoom.scaleExtent()[0])
      .attr('max', zoom.scaleExtent()[1])
      .attr('step', (zoom.scaleExtent()[1] - zoom.scaleExtent()[0]) / 100)
      .on('input', onSliderChange);

    function onSliderChange() {
      zoom.scaleTo(svg, d3Select.select(this).property('value'));
    }

    const svg = d3Select.select(this.graph.nativeElement).append('svg')
      .attr('width', this.gridLayoutService.getInnerWidth())
      .attr('height', () => {
        return this.systemDiagramOptions.height ? (((window.innerHeight) / (100 / this.systemDiagramOptions.height)) - 160) : window.innerHeight - 160;
      }) // window height minus, Navbar height and 70% when used as a component
      .append('g')
      .on('mousedown', () => { })
      .on('click', () => this.blinkLink())
      .call(zoom);

    const rect = svg.append('rect')
      .attr('width', this.gridLayoutService.getInnerWidth())
      .attr('height', window.innerHeight - 160)
      .style('fill', 'none')
      .style('pointer-events', 'all');

    const container = svg
      .append('g')
      .attr('id', 'g-transform');

    const links = this.createLinks(container);
    const group = this.createGroup(container, links);
    const nodes = this.createNode(container, links, this.data.nodes, labelPosition.bottomCenter);

    this.zoomSVG = d3Zoom.zoomTransform(container.node());
    this.d3Service.subscribeZoom().subscribe(transform => {
      if (transform) {
        this.zoomLevel = transform
      };
    });

    if (this.data && this.data.zoom) {
      this.transformZoom(this.data.zoom, true);
      delete this.data.zoom;
    } else if (this.data.reset) {
      this.zoomLevel = initialZoom;
      this.transformZoom(this.zoomLevel, true);
      delete this.data.reset;
    } else {
      this.transformZoom(this.zoomLevel);
    }
    this.d3Service.zoom(this.zoomSVG);
    zoom.transform(container, this.zoomSVG);
    d3Select.select(`.${fpListBottom}`)
      .append('li')
      .attr('id', `${fpZoomValue}`)
      .text(this.calculateScale(this.zoomSVG.k));
    this.systemDiagramDataService.setProtocol(this.protocolLinks);
  }

  createGroup(container, links) {
    if (this.data.groups) {
      const groupNodes = JSON.parse(JSON.stringify(this.data.groups));
      groupNodes.map(groupNode => {
        groupNode.width = this.componentVisualAppearance.getNodeDetails(groupNode.model_number, componentTypeStr.width, groupNode.subTypeKey);
        groupNode.height = this.componentVisualAppearance.getNodeDetails(groupNode.model_number, componentTypeStr.height, groupNode.subTypeKey);
        groupNode.x = groupNode.x - groupNode.width / 2;
        groupNode.y = groupNode.y - groupNode.height / 2;
      })
      this.createNode(container, links, this.data.groups, labelPosition.topRight, wrapperNodes.groupNode); // Drawing groupNodes as rectangle
      this.createNode(container, links, groupNodes, labelPosition.topCenter); // Drawing group image
    }
  }

  calculateScale = (k): string => {
    return `${Math.round(k * 100)}%`;
  }

  transformZoom = (currZoomValue, hasDataZoom?): void => {
    const offset = 100;

    if (!currZoomValue) {
      currZoomValue = initialZoom;
    }
    if (
      hasDataZoom &&
      this.data.dimension &&
      this.data.dimension.height &&
      this.data.dimension.width &&
      (this.data.dimension.height !== window.innerHeight ||
        this.data.dimension.width !== window.innerWidth)
    ) {
      if (this.data.dimension.width > window.innerWidth && currZoomValue.k < 1.5 && currZoomValue.x !== 0
        && this.data.dimension.height > window.innerHeight && currZoomValue.y > 10) {
        // for Laptop screen
        currZoomValue.x = (((currZoomValue.x * window.innerWidth) / this.data.dimension.width) - offset);
        currZoomValue.y = (((currZoomValue.y * window.innerHeight) / this.data.dimension.height) - offset);
      } else if (this.data.dimension.height > window.innerHeight && currZoomValue.y > 10) {
        // for small screens (ipad, ipad pro)
        currZoomValue.y = (((currZoomValue.y * window.innerHeight) / this.data.dimension.height) - offset);
      } else if (this.data.dimension.width > window.innerWidth && currZoomValue.k < 1.5 && currZoomValue.x !== 0) {
        // for large screen (desktop)
        currZoomValue.x = (((currZoomValue.x * window.innerWidth) / this.data.dimension.width) - offset);
      }
    }

    this.zoomSVG.x = currZoomValue.x;
    this.zoomSVG.y = currZoomValue.y;
    this.zoomSVG.k = currZoomValue.k;
  }

  private blinkLink() {
    if (!d3Select.event.target.closest(`.app-sd-node`)) {
      this.stopBlink();
    }
  }

  private stopBlink() {
    const fpHighlightLink = 'app-highlight-link';
    const fpDimLink = 'app-dim-link';
    d3Select.selectAll(`.${fpHighlightLink}`).classed(fpHighlightLink, false);
    d3Select.selectAll(`.${fpDimLink}`).classed(fpDimLink, false);
  }

  private createNode(systemDiagram, links, nodes = this.data.nodes, labelPos = labelPosition.bottomCenter, shape?) {
    const nodeContextMenu = new NodeContextMenu(this.router, this.systemDiagramDataService);
    const isGroupNode = (shape === wrapperNodes.groupNode);

    const svgWithNodes = systemDiagram.selectAll('node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x},${d.y})`)
      .style('visibility', (node) => this.getNodeVisibility(node))

    if (this.systemDiagramOptions && this.systemDiagramOptions.isDraggable) {
      svgWithNodes.call(this.dragFunc(links));
    }

    svgWithNodes.append('image')
      .attr('xlink:href', (d) => {
        if (Object.keys(wrapperNodes).includes(d.subTypeKey) || Object.keys(wrapperNodes).includes(shape)) {
          this.groupRenderer.render(systemDiagram, d, 'transparent');
          if (d.children) {
            this.createNode(systemDiagram, links, d.children)
          }
          return;
        }
        if (d.childrens) {
          decorateNodeWithChild(svgWithNodes, d, this.tooltipDiv, this.systemDiagramOptions.hasDiagramType);
        }
        return this.componentVisualAppearance.getNodeDetails(d.model_number, componentTypeStr.image, d.subTypeKey);
      })
      .attr('width', function (d) {
        return d.width;
      })
      .attr('height', function (d) {
        return d.height;
      })
      .attr('id', node => node.id)
      .attr('class', node => {
        let imageClasses = `app-sd-node type-${node['sub-type']} model_number-${node.model_number} sub-type-${node['sub-type']}`;
        if (
          NodeSubTypeKey.includes(node['subTypeKey']) ||
          (this.systemDiagramOptions.hasDiagramType === DiagramCategory.systemDiagram)
        ) {
          imageClasses += ` app-context-menu`;
        }
        if (isGroupNode) {
          imageClasses += ` app-cursor-none`;
        }
        return imageClasses;
      })
      .on('mousedown', () => hideTooltip(this.tooltipDiv))
      .on('mouseover', (node) => {
        this.highLightConnections(node, links);
        showTooltip(this.tooltipDiv, buildTooltipHtmlString(node, this.systemDiagramOptions.hasDiagramType));
      })
      .on('mouseout', () => {
        this.stopBlink();
        hideTooltip(this.tooltipDiv);
      });

      d3Select.selectAll('.app-context-menu')
      .on('click', d3ContextMenu(nodeContextMenu.menu(this.systemDiagramOptions), {
        theme: 'app-sd-context-menu',
        onOpen: () => {
          this.graph.nativeElement.querySelector('svg').classList.add('app-cursor-none');
        },
        onClose: () => {
          this.graph.nativeElement.querySelector('svg').classList.remove('app-cursor-none');
        }
      }));

    if (!shape) {
      // Draw circle for showing failed rules
      decorateNodeWithErrorWrapper(svgWithNodes, this.tooltipDiv, this.systemDiagramOptions.hasDiagramType);
      // Failed rules count text inside circle
      this.decorateNodeWithErrorContent.showTextHtml(svgWithNodes, this.tooltipDiv, this.systemDiagramOptions.hasDiagramType);
    }
    if (this.systemDiagramOptions.hasLabel) {
      // Add label to each node
      this.nodeLabel.appendLabel(svgWithNodes, labelPos);
    }

    return svgWithNodes;
  }

  private dragFunc = (links) => {
    const self = this;

    return d3Drag.drag()
      .on('drag', function (draggedNode) {
        draggedNode.x += d3Select.event.dx;
        draggedNode.y += d3Select.event.dy;
        draggedNode.dragged = true;

        // Update link points diagonally
        const linkIds = Object.keys(draggedNode.links);
        self.gridLayoutService.setCoordinates(draggedNode, linkIds);

        // Set x any y of the dragged node
        d3Select.select(this)
          .attr('x', draggedNode.x).attr('y', draggedNode.y)
          .attr('transform', (d) => `translate(${d.x},${d.y})`);

        links.each(function () {
          d3Select.select(this)
            .attr('d', (node) => self.linkPathCommon(node, 'drag'));
        });
      });
    // dragFun end
  }

  private createLinks = (systemDiagram): any => {

    return systemDiagram.selectAll('link')
      .data(this.data.links)
      .enter().append('path')
      .attr('id', (node) => `app-sd-link-${node.source.id}-${node.target.id}`)
      .attr('stroke', (node) => {
        this.protocolLinks.add(node.protocol);
        return protocolBasedLinkColor[node.protocol] ? protocolBasedLinkColor[node.protocol].colorCode : '';
      })
      .attr('stroke-width', '0.5')
      .attr('fill', 'none')
      .attr('d', (node) => this.linkPathCommon(node, 'links'))
      .attr('id', node => `${node.id}`)
      .attr('class', (node) => `app-sd-link protocolType-${node.protocol}`)
      .style('visibility', (d) => this.getLinkVisibility(d))
      .on('mousedown', (d) => hideTooltip(this.tooltipDiv))
      .on('mouseover', (d) => {
        showTooltip(this.tooltipDiv, buildTooltipHtmlString(d, this.systemDiagramOptions.hasDiagramType))
      })
      .on('mouseout', (d) => {
        this.stopBlink();
        hideTooltip(this.tooltipDiv);
      })
      .attr('stroke-dasharray', (link) => {
        if (link.status === 'Down') {
          this.protocolLinks.add('Missing Connection');
          return '3, 1';
        } else {
          return '0';
        }
      });
  }


  getNodeVisibility(d) {
    d.visibility = d.visibility || 'visible';
    return d.visibility;
  }

  getLinkVisibility(d) {
    for (const iterator of this.data.nodes) {
      if (
        (d.source.id === iterator.id || d.target.id === iterator.id) &&
        iterator.visibility === 'hidden'
      ) {
        return iterator.visibility;
      }
    }
    d.visibility = d.visibility || 'visible';
    return d.visibility;
  }

  private highLightConnections = (node, links): void => {
    if (d3Select.event.defaultPrevented) {
      return;
    }
    this.stopBlink();

    let linkCounter = 0;
    links.each(function (l) {
      if (l.source.id === node.id || l.target.id === node.id) {
        linkCounter++;
        d3Select.select(this).classed('app-highlight-link', true);
      } else {
        d3Select.select(this).classed('app-dim-link', true);
      }
    });
    if (!linkCounter) {
      d3Select.selectAll('.app-dim-link').classed('app-dim-link', false);
    }
  }

  private findNodeById(id, sourceNode, nodes = this.data.nodes) {
    if (!sourceNode) {
      nodes.forEach(item => {
        if (item.id === id) {
          sourceNode = item;
          return;
        }
        if (item.children) {
          sourceNode = this.findNodeById(id, sourceNode, item.children);
        }
      });
    }
    return sourceNode;
  }

  // ===========================================================================
  private linkPathCommon = (node, type): any => {
    if (node.id >= 0) {
      const connector = d3Shape.line()
        .curve(d3Shape.curveLinear)
        .x(function (d) {
          return Math.round(d[0]);
        })
        .y(function (d) {
          return Math.round(d[1]);
        });

      let sourceNode, targetNode;
      sourceNode = this.findNodeById(node.source.id, sourceNode);
      targetNode = this.findNodeById(node.target.id, targetNode);

      // Find the points of connector
      const startPoint = sourceNode.links[node.id];
      const endPoint = targetNode.links[node.id];
      this.connectingPoints = [];

      const tmpPoint = [...endPoint];
      if (startPoint[1] < endPoint[1]) { // target is below the source
        tmpPoint[0] = endPoint[0];
        tmpPoint[1] = startPoint[1];
      } else {
        tmpPoint[0] = startPoint[0];
        tmpPoint[1] = endPoint[1];
      }
      this.connectingPoints.push(startPoint, tmpPoint, endPoint);

      const nodesCrossed = this.getIntersectingNodes(node, this.connectingPoints);

      // First try switching the path movement and check again if the problem is resolved now.
      if (nodesCrossed.length && this.connectingPoints.length === 3) {
        if (this.connectingPoints[0][1] === this.connectingPoints[1][1]) {
          this.connectingPoints[1][1] = this.connectingPoints[2][1];
          this.connectingPoints[1][0] = this.connectingPoints[0][0];
        } else {
          this.connectingPoints[1][1] = this.connectingPoints[0][1];
          this.connectingPoints[1][0] = this.connectingPoints[2][0];
        }

        let numberOfAttempts = 0;

        while (nodesCrossed.length && numberOfAttempts < 5) {
          // Fixing the issue for just first node. Can be optimized to choose the correct node instead of picking first node
          // Condition to decide whether we should add additional points (total 4 points) horizontally or vertically
          // The code below is crucial and should be evolved further to resolve node intersection by deciding
          // correct path based on various corner conditions
          const firstPoint = this.connectingPoints[0];
          const lastPoint = this.connectingPoints[this.connectingPoints.length - 1];

          // Check for points length
          this.connectingPoints = [startPoint]; // Set initial start points

          const startCoOrdinates = [startPoint[0], nodesCrossed[0].y - this.getDistance(sourceNode, node)];
          // tslint:disable-next-line
          const middleCoOrdinates = [nodesCrossed[0].x - this.getDistance(sourceNode, node), nodesCrossed[0].y - this.getDistance(sourceNode, node)];
          const endCoOrdinates = [endPoint[0], nodesCrossed[0].y - this.getDistance(sourceNode, node)];
          const startCoOrdinates_1 = [nodesCrossed[0].x - this.getDistance(sourceNode, node), startPoint[1]];
          const endCoOrdinates_1 = [nodesCrossed[0].x - this.getDistance(sourceNode, node), endPoint[1]];
          const nodeEquate = Math.min(firstPoint[0], lastPoint[0]);

          if (nodeEquate > nodesCrossed[0].x && nodeEquate < nodesCrossed[0].x) {
            this.connectingPoints.push(startCoOrdinates, middleCoOrdinates, endCoOrdinates);
          } else {
            if ((startPoint[1] > endPoint[1])) {
              this.connectingPoints.push(startCoOrdinates_1, middleCoOrdinates, endCoOrdinates);
            } else if ((startPoint[1] < endPoint[1])) {
              this.connectingPoints.push(startCoOrdinates, middleCoOrdinates, endCoOrdinates_1);
            } else {
              this.connectingPoints.push(startCoOrdinates_1, endCoOrdinates_1);
            }
          }
          this.connectingPoints.push(endPoint); // Set the end point
          numberOfAttempts++;
        } // while end
      }
      return connector(this.connectingPoints);
    }
    return '';
  }

  /**
   * @param dataNode: source node
   * @param node: node which is being dragged
   * Calculates the distance of nodes
   */
  private getDistance = (dataNode, node) => {
    return Object.keys(dataNode.links).indexOf(node.id.toString()) * 5 + 5;
  }

  /**
  * @param node: node which is dragged
  * @param dataConnectingPoints: point of connections
  * Note that the "node" variable represents the link object here.
  * Check if line segments crossing any node
  * Gets the intersecting nodes and returns array of nodes intersecting
  */
  private getIntersectingNodes = (dataNode, dataConnectingPoints) => {
    const intersectingNodes = [];
    this.data.nodes.forEach(item => {
      if (item.id !== dataNode.source.id && item.id !== dataNode.target.id) {
        for (let pointIndex = 0; pointIndex < this.connectingPoints.length - 1; pointIndex++) {
          const p1 = dataConnectingPoints[pointIndex];
          const p2 = dataConnectingPoints[pointIndex + 1];
          if (this.intersection(p1[0], p1[1], p2[0], p2[1], item.x, item.y, item.x + item.width, item.y + item.height)) {
            intersectingNodes.push(item);
          }
        }
      }
    });
    return intersectingNodes;
  }

  /**
  * Currently checking intersection with just one diagonal as lines are always horizontal or perpendicular
  * If line are inclined then check for other diagonal line as well.
  */
  private intersection = (a, b, c, d, p, q, r, s) => {
    let det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  }
}
