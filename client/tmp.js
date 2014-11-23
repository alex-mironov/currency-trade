// Se crean las dimenciones de la grafica, segun la convencion de margenes de mike bostock http://bl.ocks.org/mbostock/3019563

var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Se le da formato a la fecha tiempo
var parseDate = d3.time.format("%d-%b-%y").parse;

// Se crean los rangosy las escalas
var xScale = d3.time.scale()
  .range([0, width]);
var yScale = d3.scale.linear()
  .range([height, 0]);

// DEfino los ejes
var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .ticks(5);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(5);

// Defino la linea
var linea = d3.svg.line()
  .x(function(d) { 
    return xScale(d.date); 
  })
  .y(function(d) { 
    return yScale(d.close); 
  });
    
// Agrego el lienzo svg
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// Recupero los datos
d3.csv("https://gist.githubusercontent.com/d3noob/7030f35b72de721622b8/raw/8e8fa245a969331ec1bdcfba51fd51d19098d3a0/data.csv", function(error, data) {
    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

    // Scale the range of the data
    xScale.domain(d3.extent(data, function(d) { return d.date; }));
    yScale.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Add the valueline path.
    svg.append("path")
      .attr("class", "line")
      .attr("d", linea(data));

    // Add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the Y Axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

});

// ** Update data section (Called from the onclick)
function actualizarData() {

    // Get the data again
    d3.csv("https://gist.githubusercontent.com/d3noob/7030f35b72de721622b8/raw/9fe55a381fbd301a8e9bd96c2ba28a87999099d4/data-alt.csv", function(error, data) {
        data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
      });

      // Scale the range of the data again 
      xScale.domain(d3.extent(data, function(d) { return d.date; }));
      yScale.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Select the section we want to apply our changes to
    var svg = d3.select("body").transition();

    // Make the changes
        svg.select(".line")   // change the line
            .duration(750)
            .attr("d", linea(data));
        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);

    });
}
