/*
 This script will use environment variables to initialize Parse save all objects of a given type.
 */
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var rp = require('request-promise');
var glob = require('glob-promise');
var path = require('path');
var _ = require('lodash');
var elasticsearch = require('elasticsearch');

function existsAsync(path) {
  return new Promise(function (resolve) {
      fs.exists(path, resolve);
  });
}

existsAsync(path.resolve(__dirname, '../config/config.json')).then(function(exists) {
  if (exists) {
    return Promise.resolve(require('../config/config.json'));
  }
  else {
    var host = process.env.ELASTICSEARCH_HOST || '';
    var httpAuth = process.env.ELASTICSEARCH_HTTP_AUTH || '';
    
    return Promise.resolve({
      elasticSearch: {
        host: host,
        httpAuth: httpAuth
      }
    });
  }
})
.bind(this).then(function(keys) {
  this.keys = keys;
  
  return glob(path.resolve(__dirname, '../config/elasticsearch/*.json'));
})
.then(function(files) {
  var keys = this.keys;

  keys.elasticSearch.defer = function() {
    return Promise.defer();
  };
  
  var esclient = new elasticsearch.Client(keys.elasticSearch);

  return Promise.map(files, function(file) {
    return fs.readFileAsync(file, 'utf-8')
    .bind({})
    .then(function(content) {
      this.schema = JSON.parse(content);
      this.filename = path.basename(file, path.extname(file));
      
      return updateIndex(this.filename, this.schema, esclient);
    })
  });
}).then(function() {
}).catch(function(e) {
  console.log(e);
});

function updateIndex(filename, schema, client) {
  var index = filename.toLowerCase();
  
  return client.indices.exists({index: index})
  .then(function(exists) {
    if (exists) {
      return client.indices.putMapping({index: index, type: filename, body: schema.mappings[filename]});
    }
    else {
      return client.indices.create({index: index, body: schema});
    }
  });
}