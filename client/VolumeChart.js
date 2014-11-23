function VolumeChart() {
  Chart.apply(this, arguments);
}

VolumeChart.prototype = Object.create(Chart.prototype);
VolumeChart.prototype.constructor = VolumeChart;

VolumeChart.prototype.draw = function(data) {
  var x = d3.scale.ordinal().rangeRoundBands([0, this.width], .1),
    y = d3.scale.linear().range([this.height, 0]);

  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.vol; })]);

  var barWidth = this.width / data.length;

  var bar = this.el.selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + x(d.date) + ",0)"; });

  bar.append("rect")
    .attr("y", function(d) { return y(d.vol); })
    .attr("height", function(d) { return height - y(d.vol); })
    .attr("width", x.rangeBand());


  bar.append("text")
    .attr("x", x.rangeBand() / 2)
    .attr("y", function(d) { return y(d.vol) + 3; })
    .attr("dy", ".75em")
    .text(function(d) { return d.vol; });
}
