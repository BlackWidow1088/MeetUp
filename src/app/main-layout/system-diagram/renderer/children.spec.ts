import * as d3Select from 'd3-selection';

import { decorateNodeWithChild } from 'src/app/main-layout/system-diagram/renderer/children';
import { invar } from 'src/app/main-layout/system-diagram/stubs';

describe('DecorateNodeWithChild', () => {

  it('should plot children if children exists', () => {
    for (const node of invar.nodes) {
      if (node.childrens) {
        const svg = d3Select.select('node').append('svg')
        decorateNodeWithChild(svg, node, null, 0);
        expect(node.childrens[0].slotId).toEqual(0);
        expect(node.childrens[4]).toBeUndefined();
      }
    }
  });
})
