angular.module('f1CdtAdpq').controller('AdminReportController', function($scope) {
  var data;
  var chart;
  var chartHeight = 500;

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

    chart.yAxis     //Chart y-axis settings
      .axisLabel('Notifications sent');

    data = dummyData;

    d3.select('#chart').append('svg')
        .datum(data)
        .call(chart)
        .style({ height: chartHeight});

    nv.utils.windowResize(chart.update);

    return chart;
  });
});

// Shows number of notifications sent over time by category
const dummyData = [
  {
    "key": "Earthquakes",
    "values": [
      [
        1488120272000,
        100
      ],
      [
        1488206672000,
        300
      ],
      [
        1488293072000,
        750
      ],
      [
        1488379472000,
        550
      ],
      [
        1488465872000,
        250
      ]
    ]
  },
  {
    "key": "Tsunami",
    "values": [
      [
        1488120272000,
        25
      ],
      [
        1488206672000,
        300
      ],
      [
        1488293072000,
        150
      ],
      [
        1488379472000,
        80
      ],
      [
        1488465872000,
        50
      ]
    ]
  },
  {
    "key": "Fire Boundaries",
    "values": [
      [
        1488120272000,
        250
      ],
      [
        1488206672000,
        600
      ],
      [
        1488293072000,
        410
      ],
      [
        1488379472000,
        800
      ],
      [
        1488465872000,
        100
      ]
    ]
  },
  {
    "key": "River Gauge",
    "values": [
      [
        1488120272000,
        900
      ],
      [
        1488206672000,
        600
      ],
      [
        1488293072000,
        710
      ],
      [
        1488379472000,
        350
      ],
      [
        1488465872000,
        375
      ]
    ]
  }
];
