function LineChart() {
  Chart.apply(this, arguments);
}

LineChart.prototype = Object.create(Chart.prototype);
LineChart.prototype.constructor = LineChart;

LineChart.prototype.draw = function(data) {
  var margin = this.margin;

  var xScale = d3.time.scale().range([0, this.width]);
  var yScale = d3.scale.linear().range([this.height, 0]);

  var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
  var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);

  var line = d3.svg.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.vol); });

  // Scale the range of the data
  xScale.domain(d3.extent(data, function(d) { return d.date; }));
  yScale.domain([0, d3.max(data, function(d) { return d.vol; })]);

  var svgLayout = this.el.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add the valueline path.
  svgLayout.append("path")
    .attr("class", "line")
    .attr("d", line(data));

  // Add the X Axis
  svgLayout.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + this.height + ")")
    .call(xAxis);

  // Add the Y Axis
  svgLayout.append("g")
    .attr("class", "y axis")
    .call(yAxis);
};
 