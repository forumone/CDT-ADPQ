angular.module('f1CdtAdpq').component('lineChart', {
  templateUrl: 'components/line-chart/line-chart.html',
  controller: LineChartController,
  bindings: { data: '<', id: '@' },
});

function LineChartController() {
  this.$onInit = function() {
    var chart;
    var chartHeight = 500;
    var ctrl = this;
    var chartData = this.data;

    nv.addGraph(function() {
      chart = nv.models.lineChart()
              .x(function(d) { return d[0] })
              .y(function(d) { return d[1] })
              // force the y minimum to be 0. max is still dynamic
              .forceY(0)
              .color(d3.scale.category10().range())
              .height(chartHeight)
              .margin({top:0, right:50, bottom:50, left:50})
              .options({
                  duration: 300,
                  useInteractiveGuideline: true
              });

      chart.xAxis
        .axisLabel('Date')
        .tickFormat(function(d) {
          return d3.time.format('%x')(new Date(d))
        });

      chart.yAxis
        .axisLabel('Notifications sent');

      d3.select('#' + ctrl.id + ' .chart').append('svg')
          .datum(chartData)
          .call(chart)
          .style({ height: chartHeight});

      nv.utils.windowResize(chart.update);

      return chart;
    });
  };
}