export class GroupRenderer {
  render(container, d, fillValue = '#F2F2F2') {

    container.append('rect')
      .attr('x', d.x)
      .attr('y', d.y)
      .attr('width', d.width)
      .attr('height', d.height)
      .style('fill', fillValue)
      .style('stroke', '#000')
      .style('stroke-width', 0.5)
      .style('pointer-events', 'none');
  }
}
