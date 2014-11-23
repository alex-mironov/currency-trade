function Chart(selector, width, height) {
  this.width = width;
  this.height = height;

  this.el = d3.select(selector)
    .attr('width', width)
    .attr('height', height);
}
