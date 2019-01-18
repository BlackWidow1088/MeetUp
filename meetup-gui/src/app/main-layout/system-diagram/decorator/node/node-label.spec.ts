import { NodeLabel, labelPosition } from './node-label';

describe('NodeLabel', () => {

  const nodeLabel = new NodeLabel();

  it('should find x coordinate for label', () => {
    const node = { width : 10};
    expect(nodeLabel.getX(node, labelPosition.topRight)).toEqual(10);
    expect(nodeLabel.getX(node, labelPosition.topCenter)).toEqual(5);
    expect(nodeLabel.getX(node, labelPosition.bottomCenter)).toEqual(5);
  });

  it('should find y coordinate for label', () => {
    const node = { height : 10};
    expect(nodeLabel.getY(node, labelPosition.bottomCenter)).toEqual(20);
    expect(nodeLabel.getY(node, labelPosition.topCenter)).toEqual(-26);
    expect(nodeLabel.getY(node, labelPosition.topRight)).toEqual(-10);
  });

});
