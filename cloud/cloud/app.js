/*
 * Advanced Cloud Code Example
 */
var express = require('express');
var app = express();
var Promise = require('bluebird');
var _ = require('lodash');

var elasticSearchHost = '';
var elasticSearchHttpAuth = '';

var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: elasticSearchHost,
  httpAuth: elasticSearchHttpAuth
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/**
 * afterSave handler for Hazards
 */
app.post('/hazard_afterSave', function(req, res) {
  var object = Parse.Object.fromJSON(req.body.object);
  var type = object.get('type');
  var locations;
  var alertUsers;
  var hazard_identifier = object.get('identifier');
  
  var promise;
  
  findLocations(object)
  .then(function(hits) {
    locations = hits;
    
    var users = _.chain(hits)
    .map(function(hit) {
      return hit._source.user;
    })
    .uniq()
    .value();
    
    query = new Parse.Query('_User')
      .equalTo('alerts', type)
      .containedIn('objectId', users);
    
    return query.find();
  })
  .then(function(users) {
    var ids = users.map(function(user) {
      return user.id;
    });
    
    alertLocations = locations.filter(function(location) {
      var idx = ids.indexOf(location._source.user);
      return (idx !== -1);
    });
    
    alertUsers = alertLocations.map(function(location) {
      return location._source.user;
    });
    
    return Promise.map(alertUsers, function(user) {
      var query = new Parse.Query('Alert')
        .equalTo('user', {
          __type: 'Pointer',
          className: '_User',
          objectId: user
        })
        .equalTo('hazard_type', type)
        .equalTo('hazard_identifier', hazard_identifier);
      
      return query.first().then(function(alert) {
        if (!alert) {
          var userRelation = new Parse.Relation()
          alert = new Parse.Object('Alert');
          alert.set({
            title: 'A new ' + type + ' was detected near one of your addresses',
            hazard_type: type,
            hazard_identifier: hazard_identifier,
            user: {
              __type: 'Pointer',
              className: '_User',
              objectId: user
            }
          });
          
          return alert.save().then(function(object) {
            return object;
          });
        }
        else {
          return alert;
        }
      });
    });
  })
  .then(function(alerts) {
    res.send({success: object});
  });
});

/**
 * Webhook for Location beforeSave event
 */
app.post('/location_beforeSave', function(req, res) {
  var object = Parse.Object.fromJSON(req.body.object);
  
  var newAcl = new Parse.ACL();
  newAcl.setRoleReadAccess("Administrator", true);
  newAcl.setRoleWriteAccess("Administrator", true);
  newAcl.setReadAccess(object.get('user').id, true);
  newAcl.setWriteAccess(object.get('user').id, true);
  
  object.setACL(newAcl);
  point = object.get('point');
  
  indexDocument(object, {
    point: {
      lat: point.latitude,
      lon: point.longitude,
    },
    user: object.get('user').id,
    location: object.get('location')
  }).then(function() {
    res.send({success: object});
  });
});

/**
 * Finds locations for a hazard
 * 
 * @param Parse.Object object
 * @returns []
 */
function findLocations(object) {
  var promise;
  
  if (object.has('point')) {
    var point = object.get('point');
    
    promise = client.search({index: 'location', body: {
      query: {
        constant_score: {
          filter: { 
            bool: {
              should: [{
                geo_distance: {
                  distance: '3000km',
                  point: {
                    lat: point.latitude,
                    lon: point.longitude
                  }
                }
              }]
            }
          }
        }
      }
    }});
  }
  else {
    
  }
  
  if (promise) {
    return promise.then(function(results) {
      return results.hits.hits;
    });
  }
}

/**
 * Indexes a document
 * 
 * @param Parse.Object object
 * @param Object doc
 * @returns
 */
function indexDocument(object, doc) {
  return client.update({
    index: object.className.toLowerCase(),
    type: object.className,
    id: object.id,
    body: {
      doc: doc,
      doc_as_upsert: true
    }
  });
}

module.exports = app
