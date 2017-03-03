/*
* Simple Cloud Code Example
*/
var rp = require('request-promise');
var Promise = require('bluebird');

/**
 * Polls the wildfire list to get active wildfires
 */
Parse.Cloud.define('fetchWildfires', function (request, response) {
  var features = [];
  
  rp({
    uri : 'https://wildfire.cr.usgs.gov/arcgis/rest/services/geomac_dyn/MapServer/0/query?where=objectid+is+not+null+and+state+%3D+%27OK%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson',
    method : 'GET',
    json : true
  })
  .then(function(result) {
    features = result.features;
    
    var identifiers = result.features.map(function(feature) {
      return feature.attributes.uniquefireidentifier;
    });
    
    var query = new Parse.Query('Hazard').containedIn('identifier', identifiers);
    
    return query.find();
  })
  .then(function(hazards) {
    var found = hazards.map(function(hazard) {
      return hazard.get('identifier');
    });
    
    var toBeAdded = features.reduce(function(accumulator, feature) {
      var idx = found.indexOf(feature.attributes.uniquefireidentifier);
      
      if (idx === -1) {
        var hazard = new Parse.Object('Hazard'); 
        hazard.set({
          identifier: feature.attributes.uniquefireidentifier,
          point: new Parse.GeoPoint(feature.attributes.latitude, feature.attributes.longitude),
          type: 'wildfire',
          feature: JSON.stringify(feature)
        });
        
        accumulator.push(hazard.save(null, {useMasterKey: true}));
      }
      return accumulator;
    }, []);
    
    return Promise.all(toBeAdded);
  })
  .finally(function() {
    response.success('success');
  });
});

/**
 * Polls the earthquake list to get recent earthquakes
 */
Parse.Cloud.define('fetchEarthquakes', function (request, response) {
  var features = [];

  rp({
    uri : 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Earthquakes/EarthquakesFromLastSevenDays/MapServer/0/query?text=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=objectid+is+not+null+and+region+like+%27%25California%25%27&time=1451606400000%2C+null&returnCountOnly=false&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=&outFields=*&f=pjson',
    method : 'GET',
    json : true
  })
  .then(function(result) {
    features = result.features;

    var identifiers = result.features.map(function(feature) {
      return feature.attributes.eqid;
    });

    var query = new Parse.Query('Hazard').containedIn('identifier', identifiers);

    return query.find();
  })
  .then(function(hazards) {
    var found = hazards.map(function(hazard) {
      return hazard.get('identifier');
    });

    var toBeAdded = features.reduce(function(accumulator, feature) {
      var idx = found.indexOf(feature.attributes.eqid);

      if (idx === -1) {
        var hazard = new Parse.Object('Hazard');
        hazard.set({
          identifier: feature.attributes.eqid,
          point: new Parse.GeoPoint(feature.attributes.latitude, feature.attributes.longitude),
          type: 'earthquake',
          feature: JSON.stringify(feature)
        });

        accumulator.push(hazard.save(null, {useMasterKey: true}));
      }
      return accumulator;
    }, []);

    return Promise.all(toBeAdded);
  })
  .finally(function() {
    response.success('success');
  });
});

/**
 * Polls the tsunami list to get current tsunamis
 */
Parse.Cloud.define('fetchTsunamis', function (request, response) {
  var features = [];

  rp({
    uri : 'https://maps.ngdc.noaa.gov/arcgis/rest/services/web_mercator/hazards/MapServer/0/query?where=objectid+is+not+null+and+year+%3D+2017&text=&objectIds=&time=1483228800000%2C+null&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson',
    method : 'GET',
    json : true
  })
  .then(function(result) {
    features = result.features;

    var identifiers = result.features.map(function(feature) {
      return '' + feature.attributes.ID;
    });

    var query = new Parse.Query('Hazard').containedIn('identifier', identifiers);

    return query.find();
  })
  .then(function(hazards) {
    var found = hazards.map(function(hazard) {
      return hazard.get('identifier');
    });

    var toBeAdded = features.reduce(function(accumulator, feature) {
      var idx = found.indexOf('' + feature.attributes.ID);

      if (idx === -1) {
        var hazard = new Parse.Object('Hazard');
        hazard.set({
          identifier: '' + feature.attributes.ID,
          point: new Parse.GeoPoint(feature.attributes.LATITUDE, feature.attributes.LONGITUDE),
          type: 'tsunami',
          feature: JSON.stringify(feature)
        });

        accumulator.push(hazard.save(null, {useMasterKey: true}));
      }
      return accumulator;
    }, []);

    return Promise.all(toBeAdded);
  })
  .finally(function() {
    response.success('success');
  });
});

/**
 * Polls the flood outlook list to get possible floods
 */
Parse.Cloud.define('fetchFloods', function (request, response) {
  var features = [];

  rp({
    uri : 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/sig_riv_fld_outlk/MapServer/0/query?where=objectid+is+not+null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson',
    method : 'GET',
    json : true
  })
  .then(function(result) {
    features = result.features;

    var identifiers = result.features.map(function(feature) {
      // using 'flood<issue_time>' as the ID since these do not come with truly unique identifiers
      return 'flood' + new Date(feature.attributes.issue_time).getTime();
    });

    var query = new Parse.Query('Hazard').containedIn('identifier', identifiers);

    return query.find();
  })
  .then(function(hazards) {
    var found = hazards.map(function(hazard) {
      return hazard.get('identifier');
    });

    var toBeAdded = features.reduce(function(accumulator, feature) {
      var featureId = 'flood' + new Date(feature.attributes.issue_time).getTime();
      var idx = found.indexOf(featureId);

      if (idx === -1) {
        var hazard = new Parse.Object('Hazard');
        hazard.set({
          identifier: featureId,
          // TODO: coordinates are currently [long, lat]. convert to [lat, long]
          shape: JSON.stringify(feature.geometry.rings),
          type: 'flood',
          feature: JSON.stringify(feature)
        });

        accumulator.push(hazard.save(null, {useMasterKey: true}));
      }
      return accumulator;
    }, []);

    return Promise.all(toBeAdded);
  })
  .finally(function() {
    response.success('success');
  });
});
