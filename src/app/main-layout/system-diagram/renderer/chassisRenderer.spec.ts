import { plotChassis } from 'src/app/main-layout/system-diagram/renderer/chassisRenderer';
import { invar } from 'src/app/main-layout/system-diagram/stubs';

describe('chassisRenderer', () => {

  it('should plot chassis with atleast one blade', () => {
    for (const node of invar.nodes) {
      if (node.childrens) {
        plotChassis(node.childrens);
        expect(node.childrens[0]['x']).toEqual(10);
      }
    }
  });

  it('should plot chassis with alternate slot id of blades', () => {
    for (const node of invar.nodes) {
      if (node.childrens) {
        plotChassis(node.childrens);
        expect(node.childrens[0]['x']).toEqual(10);
        expect(node.childrens[0]['y']).toEqual(0);
        expect(node.childrens[1]['x']).toEqual(10);
        expect(node.childrens[1]['y']).toEqual(15);
      }
    }
  });

  it('should not plot blade if slot id does not exist/matches', () => {
    const nodes = [...invar.nodes]

    for (const node of nodes) {
      if (node.childrens) {
        plotChassis(node.childrens);
        expect(node.childrens[3]['y']).toBeUndefined();
      }
    }
  });
})
