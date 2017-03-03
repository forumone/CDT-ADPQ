angular.module('f1CdtAdpq').service('users', function($q, parse) {
  /**
   * Logs a user in
   * @return Promise : Parse.User
   */
  function logIn(email, password) {
    return $q(function(resolve, reject) {
      parse.send(function() {
        return Parse.User.logIn(email.toLowerCase(), password);
      }, resolve, reject);
    });
  }
  
  /**
   * Returns the current user
   * @returns Parse.User
   */
  function current() {
    return Parse.User.current();
  }
  
  /**
   * Returns the current user asynchronously
   * 
   * @returns Promise
   */
  function currentAsync() {
    return $q(function(resolve, reject) {
      Parse.User.currentAsync().then(function(user) {
        resolve(user);
      })
      .fail(function(err) {
        reject(err);
      });
    });
  }
  
  /**
   * Logs a user out
   * 
   * @return Promise
   */
  function logOut() {
    return $q(function(resolve, reject) {
      parse.send(function() {
        return Parse.User.logOut();
      }, resolve, reject, false);
    });
  }
  
  /**
   * Resets a user's password
   * @return Promise : Parse.User
   */
  function requestPasswordReset(email) {
    return $q(function(resolve, reject) {
      parse.send(function() {
        return Parse.User.requestPasswordReset(email.toLowerCase());
      }, resolve, reject);
    });
  }
  
  /**
   * Returns all roles
   * @return Promise : [ Parse.Role ]
   */
  function getRoles() {
    var query = new Parse.Query(Parse.Role);
    
    return parse.find(query.ascending('name'));
  }
  
  /**
   * Returns all users sorted by their username
   * @return Promise : [ Parse.User ]
   */
  function find(skip, limit) {
    skip = (angular.isDefined(skip)) ? skip : 0;
    limit = (angular.isDefined(limit)) ? limit : 50;
    
    var query = new Parse.Query('_User');
    
    return parse.find(query.ascending('username')
      .skip(skip)
      .limit(limit));
  }
  
  function count() {
    var query = new Parse.Query('_User');
    
    return parse.count(query);
  }
  
  /**
   * Returns a User for the objectId
   * @return Promise : Parse.User
   */
  function findOne(objectId) {
    var query = new Parse.Query('_User');

    return parse.findOne(query.equalTo('objectId', objectId));
  }
  
  /**
   * Saves a User
   * 
   * @param Parse.User    user
   * @return Promise : Parse.User
   */
  function update(user) {
    user.setEmail(user.getEmail().toLowerCase());
    user.setUsername(user.getUsername().toLowerCase());
    return parse.save(user);
  }
  
  /**
   * Updates the roles a user is part of
   * @return Promise
   */
  function updateRoles(user, roles) {
    return getRoles().then(function(allRoles) {
      promises = _.map(allRoles, function(role) {
        var relation = role.getUsers();
        
        var userRole = _.find(roles, { name : role.attributes.name });

        if (userRole) {
          if (userRole.member) {
            relation.add(user);
          }
          else {
            relation.remove(user);
          }
        }
        
        return parse.save(role);
      });
      
      return $q.all(promises);
    });
  }
  
  /**
   * Returns a list of roles that a user is part of
   * @return Promise : [ { name : Parse.Role.name, member : boolean } ]
   */
  function getUserRoles(user) {
    var userRoles;
    var roleQuery = new Parse.Query(Parse.Role);
    
    return ((user) ? parse.find(roleQuery.equalTo('users', user)) : $q.when([]))
    .then(function(result) {
      userRoles = result;
      return getRoles();
    })
    .then(function(allRoles) {
      return _.map(allRoles, function(role) {
        return {
          name : role.attributes.name,
          member : (undefined !== _.find(userRoles, { id : role.id })),
          role : role
        };
      });
    });
  }
  
  /**
   * Updates a Parse user
   * 
   * @param Object userAttributes
   * @returns Promise
   */
  function updateUser(userAttributes) {
    return parse.run('updateUser', userAttributes);
  }
  
  /**
   * Checks to see if a user can edit a particular object
   * 
   * @param Parse.Object object
   * @param Parse.User user
   * @param Array roles
   * @returns boolean
   */
  function canUserEditSync(object, user, roles) {
    var canEdit = false;
    var acl = object.getACL();

    user = user || Parse.User.current();

    /*
     * A user can edit an object if:
     * 
     * 1) It's publicly writable
     * 2) The user has write access ACL
     * 3) The user is part of a role that has write access ACL
     */
    return (acl.getPublicWriteAccess() || acl.getWriteAccess(user.id) || _.some(roles, function(role) {
      if (role.member === true) {
        return acl.getRoleWriteAccess(role.role);
      }
    }));
  }
  
  /**
   * Returns whether a user is able to edit an object
   * 
   * @param Parse.Object    object
   * @param Parse.User      user
   * 
   * @return Promise : Boolean
   */
  function canUserEdit(object, user, roles) {
    var promise;
    user = user || Parse.User.current();
    
    // If roles aren't provided load them
    if (!angular.isDefined(roles)) {
      promise = getUserRoles(user);
    }
    // Otherwise use the provided roles
    else {
      promise = $q.resolve(roles);
    }

    return promise.then(function(roles) {
      return canUserEditSync(object, user, roles);
    });
  }
  
  /**
   * Checks to see if a user is an Administrator
   */
  function isAdmin(user) {
    return isRole(user, 'Administrator');
  }
  
  /**
   * Checks to see if a user has a Role
   */
  function hasRole(user, roleName) {
    user = user || Parse.User.current();
    
    return getUserRoles(user).then(function(roles) {
      var isRole = (undefined !== _.find(roles, { name : roleName, member : true }));
      return isRole;
    });
  }
  
  /**
   * Checks to see if a user is not in a specific role
   */
  function isNotRole(user, roleName) {
    user = user || Parse.User.current();
    
    return getUserRoles(user).then(function(roles) {
      var isRole = (undefined !== _.find(roles, { name : roleName, member : true }));
      if (isRole) {
        return $q.reject();
      }
      else {
        return $q.resolve();
      }
    });
  }
  
  /**
   * Checks to see if a user is currently logged in
   * @returns
   */
  function isLoggedIn() {
    return currentAsync().then(function(user) {
      return (user) ? $q.resolve(user) : $q.reject();
    });
  }
  
  /**
   * Checks to see if a user is in a specific role
   */
  function isRole(user, roleName) {
    user = user || Parse.User.current();
    
    return getUserRoles(user).then(function(roles) {
      var isRole = (undefined !== _.find(roles, { name : roleName, member : true }));
      if (isRole) {
        return $q.resolve();
      }
      else {
        return $q.reject();
      }
    });
  }
  
  /**
   * Destroys a User
   * 
   * @param Parse.User    user
   * @return Promise
   */
  function destroy(user) {
    return parse.destroy(user);
  }
  
  /**
   * Signs up a User
   * 
   * @param username
   * @param password
   * @param attrs
   * @param options
   * @returns Promise
   */
  function signUp(username, password, attrs, options)  {
    return parse.wrap(Parse.User.signUp(username, password, attrs, options));
  }
  
  return {
    logIn : logIn,
    logOut : logOut,
    requestPasswordReset : requestPasswordReset,
    find : find,
    findOne : findOne,
    getRoles : getRoles,
    update : update,
    updateRoles : updateRoles,
    getUserRoles : getUserRoles,
    canUserEdit : canUserEdit,
    canUserEditSync : canUserEditSync,
    destroy: destroy,
    isAdmin : isAdmin,
    isRole : isRole,
    isNotRole : isNotRole,
    current : current,
    currentAsync : currentAsync,
    isLoggedIn : isLoggedIn,
    signUp : signUp,
    hasRole : hasRole,
    count: count,
    updateUser: updateUser
  };
});