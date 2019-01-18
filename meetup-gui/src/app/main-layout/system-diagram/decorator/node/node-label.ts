import { EllipsisPipe } from 'src/app/shared/pipes/ellipsis.pipe';
import { wrapperNodes } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';

export enum labelPosition {
  topCenter, bottomCenter, topRight
}

export class NodeLabel {
  appendLabel(container, position) {
    const maxLength = 22;
    const labelColor = '#454545';
    container.append('text')
      .text((d) => {
        return position === labelPosition.topRight || d.subTypeKey === wrapperNodes.service_profile ? d.type : new EllipsisPipe().transform(d.label, maxLength);
      })
      .attr('x', (d) => this.getX(d, position))
      .attr('y', (d) => this.getY(d, position))
      .attr('text-anchor', () => {
        return position === labelPosition.topRight ? 'start' : 'middle';
      })
      .style('font-size',  () => {
        return position === labelPosition.topRight ? '17' : '15';
      })
      .style('fill', labelColor)
      .style('direction', () => {
        return position === labelPosition.topRight ? 'rtl' : 'inherit';
      });
  }

  getX(node, position) {
    switch (position) {
      case labelPosition.topRight: {
        return node.width;
      }
      default:
        return node.width / 2;
    }
  }

  getY(node, position) {
    const yOffset = 10;
    switch (position) {
      case labelPosition.bottomCenter: {
        return node.height + yOffset;
      }
      case labelPosition.topCenter: {
        // to prevent overlapping with the failed rule count
        const textOffset = 44;
        return node.height - textOffset;
      }
      default: {
        return -yOffset;
      }
    }
  }
}
