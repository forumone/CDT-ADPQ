/*
 This script will use environment variables to initialize Parse save all objects of a given type.
 */
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var rp = require('request-promise');
var glob = require('glob-promise');
var path = require('path');
var _ = require('lodash');


function existsAsync(path) {
  return new Promise(function (resolve) {
      fs.exists(path, resolve);
  });
}

existsAsync(path.resolve(__dirname, '../keys.json')).then(function(exists) {
  if (exists) {
    return Promise.resolve(require('../keys.json'));
  }
  else {
    var parseApplicationId = process.env.PARSE_APPLICATION_ID || '';
    var parseJavascriptKey = process.env.PARSE_JAVASCRIPT_KEY || '';
    var serverUrl = process.env.PARSE_SERVER_URL || '';
    
    return Promise.resolve({
      parseApplicationId: parseApplicationId,
      parseJavascriptKey: parseJavascriptKey,
      serverUrl: serverUrl
    });
  }
})
.bind(this).then(function(keys) {
  this.keys = keys;
  
  return glob(path.resolve(__dirname, '../config/parse/*.json'));
})
.then(function(files) {
  var keys = this.keys;

  return Promise.map(files, function(file) {
    return fs.readFileAsync(file, 'utf-8')
    .bind({})
    .then(function(content) {
      this.schema = JSON.parse(content);
      this.filename = path.basename(file, path.extname(file));
      
      // Get the current Schema so we can adjust it
      return rp({
        uri : keys.serverUrl + 'schemas/' + this.filename,
        method : 'GET',
        headers : {
          'X-Parse-Application-Id': keys.parseApplicationId,
          'X-Parse-Master-Key': keys.parseMasterKey
        },
        json : true
      });
    })
    .then(function(currentSchema) {
      // Remove protected fields
      var currentFields = _.without.apply(_, [Object.keys(currentSchema.fields)]
        .concat(['objectId', 'createdAt', 'updatedAt', 'ACL', 'username', 'password', 'email', 'emailVerified', 'authData']));
      
      var targetSchema = this.schema;
      var targetFields = Object.keys(targetSchema.fields);

      // Remove any field that is on the current Schema or where the data type has changed
      var removeFields = _.reduce(currentFields, function(result, value) {
        if (_.has(currentSchema.fields, value) && _.has(targetSchema.fields, value) && currentSchema.fields[value].type !== targetSchema.fields[value].type) {
          result.push(value);
        }
        return result;
      }, _.without.apply(_, [currentFields].concat(targetFields)));

      // Get the list of fields that we need to add
      var afterRemove = _.without.apply(_, [currentFields].concat(removeFields));
      this.addFields = _.without.apply(_, [targetFields].concat(afterRemove));
      
      // Remove all fields that need to be removed
      return Promise.each(removeFields, function(field) {
        var body = {
          className : targetSchema.className,
          fields : {}
        };
        
        body.fields[field] = { '__op' : 'Delete' };
        
        return rp({
          uri: keys.serverUrl + 'schemas/' + targetSchema.className,
          method: 'PUT',
          headers: {
            'X-Parse-Application-Id': keys.parseApplicationId,
            'X-Parse-Master-Key': keys.parseMasterKey
          },
          body : body,
          json : true
        });
      });
    }).then(function() {
      var targetSchema = this.schema;
      var fields = {};
      
      this.addFields.forEach(function(field) {
        fields[field] = targetSchema.fields[field];
      });
      
      targetSchema.fields = fields;
      
      // Add back the fields that are new or have been changed
      var options = {
        uri: keys.serverUrl + 'schemas/' + this.filename,
        method: 'PUT',
        headers: {
          'X-Parse-Application-Id': keys.parseApplicationId,
          'X-Parse-Master-Key': keys.parseMasterKey
        },
        body : targetSchema,
        timeout: 300000,
        json: true // Automatically parses the JSON string in the response
      };
      
      return rp(options);
    });
  });
}).then(function() {
}).catch(function(e) {
  console.log(e);
});