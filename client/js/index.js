
var data = JSON.parse('[{"date":"2014-10-08","bid":"12.9800","ask":"13.1800","vol":"145.60"},' + 
  '{"date":"2014-10-09","bid":"12.9800","ask":"13.1800","vol":"312.90"},' + 
  '{"date":"2014-10-10","bid":"12.9700","ask":"13.1200","vol":"340.60"},' + 
  '{"date":"2014-10-13","bid":"12.9700","ask":"13.1300","vol":"94.20"},' +
  '{"date":"2014-10-14","bid":"12.9900","ask":"13.1800","vol":"146.30"},{"date":"2014-10-15","bid":"12.9500","ask":"13.1500","vol":"160.70"},{"date":"2014-10-16","bid":"12.9800","ask":"13.1000","vol":"269.00"},{"date":"2014-10-17","bid":"12.9600","ask":"13.1000","vol":"316.80"},{"date":"2014-10-20","bid":"12.9600","ask":"13.1100","vol":"484.30"},{"date":"2014-10-21","bid":"12.9600","ask":"13.1100","vol":"208.80"},{"date":"2014-10-22","bid":"12.9700","ask":"13.1200","vol":"185.40"},{"date":"2014-10-23","bid":"12.9600","ask":"13.1100","vol":"262.50"},{"date":"2014-10-24","bid":"12.9500","ask":"13.1100","vol":"157.70"},{"date":"2014-10-27","bid":"12.9800","ask":"13.1300","vol":"444.00"},{"date":"2014-10-28","bid":"13.0000","ask":"13.5000","vol":"189.10"},{"date":"2014-10-29","bid":"12.9800","ask":"13.5000","vol":"183.20"},{"date":"2014-10-30","bid":"12.9700","ask":"13.4500","vol":"256.70"},{"date":"2014-10-31","bid":"12.9900","ask":"13.4800","vol":"183.80"},{"date":"2014-11-03","bid":"12.9600","ask":"13.4600","vol":"392.00"},{"date":"2014-11-04","bid":"12.9600","ask":"13.4600","vol":"113.60"},{"date":"2014-11-05","bid":"13.6000","ask":"14.0000","vol":"178.20"}]');

var parseDate = (function () {
  var parse = d3.time.format('%Y-%m-%d').parse;
  return function(date) {
    return parse(date);
  }
})();

data.forEach(function(d) {
    d.vol = +d.vol;
    d.ask = +d.ask;
    d.bid = +d.bid;
    d.date = parseDate(d.date);
});

var width = 960,
  height = 500;

var volumeChart = new VolumeChart({
  selector: 'body',
  width: width,
  height: height
});
volumeChart.draw(data);

var lineChart = new LineChart({
  selector: 'body',
  width: width,
  height: height,
  margin: {
    left: 40,
    right: 40,
    top: 20,
    bottom: 20
  }
});
lineChart.draw(data);
