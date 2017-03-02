angular.module('f1CdtAdpq').controller('DeliveryChartController', function($scope) {
  // using dummy delivery type data
  this.data = [
    {
      "key": "Email",
      "values": [
        [
          1488120272000,
          500
        ],
        [
          1488206672000,
          320
        ],
        [
          1488293072000,
          250
        ],
        [
          1488379472000,
          600
        ],
        [
          1488465872000,
          450
        ]
      ],
    },
    {
      "key": "Text (SMS)",
      "values": [
        [
          1488120272000,
          200
        ],
        [
          1488206672000,
          400
        ],
        [
          1488293072000,
          450
        ],
        [
          1488379472000,
          230
        ],
        [
          1488465872000,
          800
        ]
      ],
    },
  ];
});