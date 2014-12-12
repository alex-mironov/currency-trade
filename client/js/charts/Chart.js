function Chart(options) {
  var margin = options.margin || {};
  margin.left = margin.left || 0;
  margin.right = margin.right || 0;
  margin.top = margin.top || 0;
  margin.bottom = margin.bottom || 0;

  this.width = options.width - margin.left - margin.right;
  this.height = options.height - margin.top - margin.bottom;

  this.el = d3.select(options.selector)
    .append("svg")
      .attr('class', options.className)
      .attr('width', options.width)
      .attr('height', options.height);

  this.margin = margin;
}
