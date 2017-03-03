angular.module('f1CdtAdpq').service('parse', function($q, Backoff, $timeout, $state, $rootScope) {
  var requestCount = 0;

  /**
   * Wraps a promise from the Parse api
   */
  function wrap(parsePromise) {
    return $q(function(resolve, reject) {
      parsePromise.then(resolve).fail(reject);
    });
  }

  /**
   * Sends a request to Parse
   */
  function send(func, resolve, reject, catchErrors) {
    catchErrors = (angular.isDefined(catchErrors)) ? catchErrors : true;
    
    var backoff = new Backoff({
      min : 100,
      max : 10000
    });

    function doSend() {
      if (0 === requestCount) {
        requestCount++;
        $rootScope.$broadcast('parseRequestStarted');
      }
      var duration = backoff.duration();
      $timeout(function() {
        func.call().then(function(result) {
          backoff.reset();
          resolve(result);
        }).fail(function(result) {
          // If we failed due to request limits and we're able to retry
          if (Parse.Error.REQUEST_LIMIT_EXCEEDED == result.code && duration < backoff.max) {
            doSend();
          }
          // If the operation was disallowed
          else if (Parse.Error.OPERATION_FORBIDDEN == result.code && catchErrors && true !== $state.current.abstract) {
            $rootScope.$broadcast('parseOperationForbidden');
            reject(result);
          }
          else if (Parse.Error.INVALID_SESSION_TOKEN == result.code && catchErrors && true !== $state.current.abstract) {
            $rootScope.$broadcast('parseInvalidSessionToken');
            reject(result);
          }
          else {
            reject(result);
          }
        }).always(function() {
          requestCount--;

          if (0 === requestCount) {
            $rootScope.$broadcast('parseRequestStopped');
          }
        });
      }, duration);
    }

    doSend();
  }

  function run(name, data) {
    return $q(function(resolve, reject) {
      send(function() {
        return Parse.Cloud.run(name, data);
      }, resolve, reject);
    });
  }

  /**
   * Executes a Find on a Parse Query
   */
  function find(query) {
    return $q(function(resolve, reject) {
      send(function() {
        return query.find();
      }, resolve, reject);
    });
  }

  /**
   * Executes a First on a Parse Query
   */
  function findOne(query) {
    return $q(function(resolve, reject) {
      send(function() {
        return query.first();
      }, resolve, reject);
    });
  }

  /**
   * Executes a Count for a Parse Query
   */
  function count(query) {
    return $q(function(resolve, reject) {
      send(function() {
        return query.count();
      }, resolve, reject);
    });
  }

  /**
   * Executes a Save on a Parse Object
   */
  function save(obj) {
    return $q(function(resolve, reject) {
      send(function() {
        return obj.save();
      }, resolve, reject);
    });
  }
  
  /**
   * Saves all Parse Objects
   * @param Array objects
   */
  function saveAll(objects) {
    return $q(function(resolve, reject) {
      send(function() {
        return Parse.Object.saveAll(objects);
      }, resolve, reject);
    });
  }
  
  /**
   * Uploads a file
   */
  function uploadFile(name, file) {
    var parseFile = new Parse.File(name, file);
    return $q(function(resolve, reject) {
      send(function() {
        return parseFile.save();
      }, resolve, reject);
    });
  }
  
  /**
   * Destroys an object
   */
  function destroy(obj) {
    return $q(function(resolve, reject) {
      send(function() {
        return obj.destroy({});
      }, resolve, reject);
    });
  }
  
  /**
   * Converts a Parse.Object to a simple value object
   * 
   * @param object Parse.Object
   * @returns Object
   */
  function getValueObject(object) {
    var attributes = angular.isDefined(object.attributes) ? angular.copy(object.attributes) : {};
    ['ACL', 'createdAt', 'emailVerified', 'sessionToken', 'updatedAt'].forEach(function(field) {
      if (angular.isDefined(attributes[field])) {
        delete attributes[field];
      }
    });
    
    attributes.objectId = object.id;
    attributes.className = object.className;

    return attributes;
  }

  return {
    wrap : wrap,
    find : find,
    save : save,
    destroy : destroy,
    findOne : findOne,
    send : send,
    count : count,
    run : run,
    uploadFile : uploadFile,
    getValueObject : getValueObject,
    saveAll: saveAll
  };
});