var lineChart = (function() {

  var xScale = d3.time.scale()
    .range([0, 600]);
  var yScale = d3.scale.linear()
    .range([300, 0]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(5);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(5);

  var line = d3.svg.line()
    .x(function(d) { 
      return xScale(d.date); 
    })
    .y(function(d) { 
      return yScale(d.vol); 
    });

  var svg = d3.select("body")
    .append("svg")
      .attr("width", 680)
      .attr("height", 340)
    .append("g")
      .attr("transform", 
            "translate(" + 40 + "," + 20 + ")");

  return {
    draw: draw
  };

  function draw(data) {
    // Scale the range of the data
    xScale.domain(d3.extent(data, function(d) { return d.date; }));
    yScale.domain([0, d3.max(data, function(d) { return d.vol; })]);

    // Add the valueline path.
    svg.append("path")
      .attr("class", "line")
      .attr("d", line(data));

    // Add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 300 + ")")
      .call(xAxis);

    // Add the Y Axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
  }

})();
