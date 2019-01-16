import { Injectable } from '@angular/core';

import { plotChassis } from 'src/app/main-layout/system-diagram/renderer/chassisRenderer';
import { DiagramCategory } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import {
  componentTypeStr, ComponentVisualAppearanceDetails,
} from 'src/app/main-layout/system-diagram/util/componentVisualAppearance';
import { VmInfrastructureRenderer } from 'src/app/main-layout/system-diagram/renderer/vm-infrastructure-renderer';

export const sequenceProtocol = {
  'virtualization': 1,
  'vm': 1.1,
  'virtual machine': 1.1,
  'vswitch': 1.2,
  'vmnic': 1.3,
  'vmknic': 1.4,
  'portgroup': 1.5,
  'nas datastore': 1.6,
  'vnic': 1.7,
  'volume': 1.8,
  'compute': 2,
  'rack server': 2.1,
  'chassis': 2.2,
  'fi': 2.3,
  'switch': 2.4,
  'blade server': 2.5,
  'fex': 2.6,
  'network': 3,
  'mds': 3.1,
  'nexus': 3.2,
  'ethernet': 3.3,
  'unified': 3.4,
  'fc': 3.5,
  'storage': 4,
  'storage controller': 4.1
}

class RectangleNode {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
  model_number: string;
  label: string;
}

/**
 * This service is responsible for construction and plotting components in grid.
 */

@Injectable()
export class GridLayoutService {
  private innerWidth;
  private componentVisualAppearance = new ComponentVisualAppearanceDetails();
  private vmInfraRenderer = new VmInfrastructureRenderer(this);

  initializeNodes = (dataNodes, diagramType = DiagramCategory.systemDiagram): void => {
    switch (diagramType) {
      case DiagramCategory.systemDiagram: {
        this.positionNodes(dataNodes.nodes);
        break;
      }
      default:
        this.vmInfraRenderer.handleGroups(dataNodes)
        this.positionNodes(dataNodes.nodes, `vm-infra`);
    }
    if (dataNodes.groups) {
      this.positionGroups(dataNodes);
    }
    this.initializeLinks(dataNodes);
  }

  positionGroups(data) {
    const rectangle = {};
    const paddingLeft = 60;
    const parentSet = data.groups.map(group => group.type);
    for (const wrapperNodeName of parentSet) {
      rectangle[wrapperNodeName] = new RectangleNode();
      const filteredNodes = data.nodes.filter(node => node.group === wrapperNodeName)
      filteredNodes.map(node => {
        const groupNode = data.groups.filter(grp => node.group === grp.type)[0]
        this.setGroupDimension(rectangle[wrapperNodeName], node, groupNode);
      })
      data.groups.filter(node => {
        if (node.type === wrapperNodeName) {
          node.x = rectangle[wrapperNodeName].minX - paddingLeft,
            node.y = rectangle[wrapperNodeName].minY - paddingLeft,
            node.width = rectangle[wrapperNodeName].maxX + rectangle[wrapperNodeName].width + paddingLeft - node.x;
          node.height = rectangle[wrapperNodeName].maxY + rectangle[wrapperNodeName].height + paddingLeft - node.y;
        }
      })
    }
  }

  private setGroupDimension(rectNode, node, groupNode) {
    rectNode.minX = rectNode.minX ? node.x < rectNode.minX ? node.x : rectNode.minX : node.x;
    rectNode.minY = rectNode.minY ? node.y < rectNode.minY ? node.y : rectNode.minY : node.y;
    rectNode.maxX = rectNode.maxX ? node.x > rectNode.maxX ? node.x : rectNode.maxX : node.x;
    rectNode.maxY = rectNode.maxY ? node.y > rectNode.maxY ? node.y : rectNode.maxY : node.y;
    rectNode.width = node.width;
    rectNode.height = node.height;
    rectNode.model_number = groupNode.model_number;
    rectNode.label = groupNode.label;
  }

  private positionNodes(dataNodes, layout?) {
    this.sort(dataNodes);
    this.updateDimension(dataNodes);
    switch (layout) {
      case `chassis`: {
        plotChassis(dataNodes);
        break;
      }
      case `vm-infra`: {
        this.vmInfraRenderer.plotVmInfra(dataNodes);
        break;
      }
      default: this.plotGrid(dataNodes);
    }
  }

  private updateDimension(dataNodes) {
    dataNodes.forEach(node => {
      this.componentVisualAppearance.updateDimensions(node);
      if (node.children) {
        this.updateDimension(node.children);
      }
    });
  }

  plotGrid(nodes, startX = 0, yInit = 50, offset = 0) {
    const typeMapper = this.buildComponentTypeMap(nodes);
    this.calculateInnerWidth(typeMapper);
    let x = startX, y = 0, criteria;
    for (let i = 0; i < nodes.length; i++) {
      if (criteria === nodes[i].subTypeKey) {
        // Checks if x, y co-ordinates already exists
        if (!nodes[i].x) {
          nodes[i].x = x;
          nodes[i].y = y;
        }
        // Checking for components belonging to same line or not
        x += offset ? offset : this.calculateX(nodes[i], typeMapper);
      } else {
        const imageWidth = nodes[i].width / 2;
        criteria = nodes[i].subTypeKey;
        x = startX ? startX : this.calculateX(nodes[i], typeMapper, imageWidth);
        i--;
        y += nodes[i] ? this.calculateY(nodes[i]) : yInit;
        continue;
      }
      if (nodes[i].childrens) {
        this.positionNodes(nodes[i].childrens, nodes[i].subTypeKey);
      }
    }
  }

  private initializeLinks(dataNodes) {
    dataNodes.nodes.forEach(element => {
      element.links = this.getLinksDetailForNode(element, dataNodes.links);
      this.updateLinkPointsDiagonally(element);
      if (element.children) {
        element.children.forEach(child => {
          child.links = this.getLinksDetailForNode(child, dataNodes.links);
          this.updateLinkPointsDiagonally(child);
        });
      }
    })
  }

  private sort(nodes) {
    const self = this;
    nodes.sort(function (a, b) {
      if (a.children) {
        self.sort(a.children)
      }
      if (b.children) {
        self.sort(b.children)
      }
      return sequenceProtocol[a.subTypeKey] - sequenceProtocol[b.subTypeKey];
    });
  }

  private getLinksDetailForNode(node, links) {
    links.map((element, index) => {
      if (element) {
        element.id = index;
      }
    });
    const linkObj = {};
    for (const link of links) {
      if (link && node && ((link.source && link.source.id === node.id) || (link.target && link.target.id === node.id))) {
        linkObj[link.id] = [];
      }
    }
    return linkObj;
  }

  public updateLinkPointsDiagonally(node) {
    const linkIds = Object.keys(node.links);
    this.setCoordinates(node, linkIds);
  }

  setCoordinates = (node, linkIds): void => {
    const pointer = 2,
      padding = 2,
      x1 = node.x + padding,
      y1 = node.y + padding,
      x2 = x1 + node.width,
      y2 = y1 + node.height,
      points = this.getCoordinates([x1, y1], [x2, y2]),
      getCenterPoint = Math.round(points.length / 2);

    for (
      let iLoop = 0, nodePoint = getCenterPoint, counter = 1;
      iLoop < linkIds.length; iLoop++
    ) {
      nodePoint = (iLoop % 2 === 0) ? getCenterPoint + counter : getCenterPoint - counter;
      node.links[linkIds[iLoop]] = [points[nodePoint][0], points[nodePoint][1]];
      counter += pointer;
    }
  }

  private getCoordinates = (firstPoint, secondPoint): any[] => {
    const coordinates = [],
      m = this.slope(firstPoint, secondPoint),
      b = this.intercept(firstPoint, m);

    for (let x = firstPoint[0]; x <= secondPoint[0]; x++) {
      const y = m * x + b;
      coordinates.push([x, y]);
    }
    return coordinates;
  }

  private slope = (x, y): any => {
    return (x[0] === y[0]) ? null : (y[1] - x[1]) / (y[0] - x[0]);
  }

  private intercept = (point, m): any => {
    return (m === null) ? point[0] : point[1] - m * point[0];
  }

  private calculateX(node, typeMapper, offset = 0) {
    return (this.getInnerWidth() / (typeMapper[node['sub-type']].length + 1)) - offset;
  }

  private calculateY(node) {
    const verticalDistanceBetweenNodes = 40;
    return this.componentVisualAppearance.getNodeDetails(node.model_number, componentTypeStr.height, node.subTypeKey) + verticalDistanceBetweenNodes;
  }

  buildComponentTypeMap(nodes) {
    const typeMapper: any = {};
    for (const node of nodes) {
      if (!typeMapper[node['sub-type']]) {
        typeMapper[node['sub-type']] = [];
      }
      typeMapper[node['sub-type']].push(node);
    }
    return typeMapper;
  }

  private calculateInnerWidth(typeMapper) {
    const list: any[] = [];
    for (const type of Object.keys(typeMapper)) {
      let width = 0;
      for (const node of typeMapper[type]) {
        width += this.componentVisualAppearance.getNodeDetails(node.model_number, componentTypeStr.width, node.subTypeKey);
      }
      list.push(width);
    }
    list.sort(function (a, b) {
      return b - a;
    });
    this.innerWidth = list[0] + 400; // 400 units is distinguishable gap between two nodes
  }

  getInnerWidth() {
    return this.innerWidth > window.innerWidth ? this.innerWidth : window.innerWidth;
  }
}
