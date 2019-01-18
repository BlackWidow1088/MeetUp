import { ComponentVisualAppearanceDetails, componentTypeStr } from 'src/app/main-layout/system-diagram/util/componentVisualAppearance';
import { wrapperNodes } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { GridLayoutService } from 'src/app/main-layout/system-diagram/services/grid-layout.service';
import { Node } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';

enum alignment {
  horizontal, vertical
}

export interface TypeVsOccurences {
  type: string,
  count: number
}

export const virtualizationParent = {
  'host_logical_box': {
    align: alignment.horizontal,
    rank: 1,
    label: 'ESXi-1',
  },
  'server_logical_box': {
    align: alignment.horizontal,
    rank: 2,
    label: 'Blade-1'
  },
  'svm_logical_box': {
    align: alignment.vertical,
    rank: 3,
    label: 'Infra-SVM'
  },
}

export class VmInfrastructureRenderer {

  private componentVisualAppearance = new ComponentVisualAppearanceDetails();

  constructor(private gridLayoutService: GridLayoutService) {
  }

  private vmInfraSpecialNode(nodesWithSameParent, xOffset) {
    const serviceProfileNodes = nodesWithSameParent.filter(node => node.subTypeKey === wrapperNodes.service_profile);
    const startHorizontalOffset = 60; // in order to have margin from rectangle to image x - coordinate
    const startVerticalOffset = 40; // in order to have margin from rectangle to image y - coordinate
    serviceProfileNodes.map(serviceProfileNode => {
      const xCoordinate = serviceProfileNode.x + startHorizontalOffset;
      const yCoordinate = serviceProfileNode.y + startVerticalOffset;
      this.addServiceProfileAsNode(serviceProfileNode);

      // To draw all nodes vertically inside service profile node we need to modify sub-type key
      this.modifySubTypeKey(serviceProfileNode);

      this.gridLayoutService.plotGrid(serviceProfileNode.children, xCoordinate, yCoordinate, xOffset);
      this.updateServiceProfileNode(serviceProfileNode);
    });
  }

  private modifySubTypeKey(serviceProfileNode) {
    let count = 0;
    serviceProfileNode.children.map(node => node.subTypeKey = `${node.subTypeKey}${count++}`);
  }

  private addServiceProfileAsNode(serviceProfileNode) {
    const node = { ...serviceProfileNode };
    delete node.group;
    delete node.children;
    delete node.x;
    delete node.y;
    node.subTypeKey = `updated_${node.subTypeKey}`
    node.height = this.componentVisualAppearance.getNodeDetails(node.model_number, componentTypeStr.height, node.subTypeKey)
    node.width = this.componentVisualAppearance.getNodeDetails(node.model_number, componentTypeStr.width, node.subTypeKey)
    serviceProfileNode.children.unshift(node);
  }

  plotVmInfra(nodes) {
    // To sort nodes based on their group ranks
    this.sort(nodes);
    const parentsSet = this.populateUniqueVmParents(nodes), parentSetLength = parentsSet.length, xOffset = 300, yOffset = 50, horzNodeGap = 200, xInit = this.startX(nodes);
    let startX = xInit, startY = 150;
    let verticalGapBetweenTwoRect = 250; // Minimum gap between two vertical rectangle
    for (let i = 0; i < parentSetLength; i++) {
      const nodesWithSameParent = nodes.filter(node => node.group === parentsSet[i]);
      this.gridLayoutService.plotGrid(nodesWithSameParent, startX, startY, horzNodeGap);
      this.vmInfraSpecialNode(nodesWithSameParent, xOffset);
      if (i < parentSetLength - 1) {
        if (virtualizationParent[parentsSet[i + 1]].align === alignment.horizontal) {
          nodesWithSameParent.filter(node => {
            startX = this.findOffset(startX, node.x + node.width);
            const nodeValue = node.y + node.height
            verticalGapBetweenTwoRect = this.findOffset(verticalGapBetweenTwoRect, nodeValue)
          });
          startX += xOffset;
        } else {
          nodesWithSameParent.filter(node => {
            startY = this.findOffset(startY, node.y);
          });
          startX = xInit;
          startY += yOffset + verticalGapBetweenTwoRect;
        }
      }
    }
  }

  startX(nodes: Node[]): number {
    const typeVsOccurences = this.getTypeVsOccurences(nodes), iconWidth = 75, minStartX = 200;
    let xValue = 0;
    for (const key of Object.keys(typeVsOccurences)) {
      switch (key) {
        case 'host_logical_box': {
          const xOffsetBetweenNodes = 125;
          xValue += typeVsOccurences[key] * iconWidth + ((typeVsOccurences[key] - 1) * xOffsetBetweenNodes);
          break;
        }
        case 'server_logical_box': {
          const noOfChilds = nodes.filter(node => node.group === key).length, serviceProfileRectWidth = 195, withServiceProfileOffset = 300, withoutServiceProfileOffset = 225;
          const imageWidth = noOfChilds ? serviceProfileRectWidth : iconWidth;
          const horizGap = noOfChilds ? withServiceProfileOffset : withoutServiceProfileOffset;
          xValue += typeVsOccurences[key] * imageWidth + horizGap;
          break;
        }
        default:
          break;
      }
    }
    xValue = (window.innerWidth / 2) - (xValue / 2);
    return this.findOffset(xValue, minStartX);
  }

  getTypeVsOccurences(nodes: Node[]): TypeVsOccurences {
    let uniqueGroups = this.populateUniqueVmParents(nodes), typeVsOccurences = {} as TypeVsOccurences;
    for (let boxType of uniqueGroups) {
      const nodesWithSameGroup = nodes.filter(node => node.group === boxType);
      const typeMapper = this.gridLayoutService.buildComponentTypeMap(nodesWithSameGroup);
      typeVsOccurences[boxType] = Object.keys(typeMapper).reduce((prev, cur) => this.findOffset(prev, typeMapper[cur].length), 0);;
    }
    return typeVsOccurences;
  }

  populateUniqueVmParents(nodes) {
    const parentsSet = [];
    nodes.map(node => {
      if (node.group && !parentsSet.includes(node.group)) {
        parentsSet.push(node.group)
      }
    });
    return parentsSet;
  }

  findOffset(offset, nodeValue, isMax = true) {
    return isMax ? Math.max(offset, nodeValue) : Math.min(offset, nodeValue);
  }

  updateServiceProfileNode(serviceProfileNode) {
    let maxX, minX, minY, maxY;

    serviceProfileNode.children.map(node => {
      if (!minX) {
        minX = node.x;
        minY = node.y;
        maxX = node.x;
        maxY = node.y;
      }
      const nodeXValue = node.x + node.width;
      const nodeYValue = node.y + node.height;
      maxX = this.findOffset(maxX, nodeXValue);
      minX = this.findOffset(minX, nodeXValue, false);
      maxY = this.findOffset(maxY, nodeYValue);
      minY = this.findOffset(minY, nodeYValue, false);
    })

    serviceProfileNode.width = maxX + minX - 2 * serviceProfileNode.x;
    serviceProfileNode.height = maxY + minY - 2 * serviceProfileNode.y;
  }

  private sort(nodes) {
    nodes.sort(function (a, b) {
      return virtualizationParent[a.group].rank - virtualizationParent[b.group].rank;
    });
  }

  // added custom/fake node if zero nodes are present and set visibility as hidden
  handleGroups(data) {
    const fakeNode = {
      typeKey: 'server logical box',
      label: 'server logical box',
      subTypeKey: 'server logical box',
      visibility: 'hidden'
    }
    const uniqueGroup = [...data.groups.map(node => node.type)];
    uniqueGroup.map(unique => {
      const nodes = data.nodes.filter(node => node.group === unique);
      if (!nodes.length) {
        fakeNode[`group`] = unique;
        data.nodes.push(fakeNode);
      }
    });
  }

}
