angular.module('f1CdtAdpq').service('addresses', function($q, parse) {
  /**
   * Returns the locations for a User
   * 
   * @param Parse.Object user
   * @returns Promise : [Parse.Object]
   */
  function getUserLocations(user) {
    var query = new Parse.Query('Location')
      .ascending('name')
      .equalTo('user', user.toPointer());
    
    return parse.find(query);
  }
  
  return {
    getUserLocations: getUserLocations
  }
});