angular.module('f1CdtAdpq').component('userLocation', {
  templateUrl: 'states/user/components/location/location.html',
  bindings: {
    location: '=?',
    onDelete: '&',
    onSave: '&'
  },
  controller: function(parse, users) {
    var ctrl = this;
    var currentUser = users.current();
    
    this.isEditing = false;
    this.isEnabled = true;
    
    this.edit = function() {
      this.isEditing = true;
      this.isEnabled = true;
    }
    
    this.save = function(place) {
      this.isEnabled = false;
      ctrl.location.set('point', new Parse.GeoPoint(place.geometry.location.lat(), place.geometry.location.lng()));
      ctrl.location.set('location', place.formatted_address);
      ctrl.location.set('user', currentUser);
      
      parse.save(ctrl.location).then(function(location) {
        ctrl.isEditing = false;
        ctrl.isEnabled = true;
        
        ctrl.location = location;
        ctrl.onSave({location: ctrl.location})
      });
    }
    
    this.deleteLocation = function() {
      ctrl.onDelete({location: ctrl.location});
    }
    
    this.$onInit = function() {
      if (!angular.isDefined(ctrl.location)) {
        ctrl.location = new Parse.Object('Location');
      }
      
      if (ctrl.location.isNew()) {
        ctrl.isEditing = true;
      }
      
      ctrl.poi = (ctrl.location.has('location')) ? ctrl.location.get('location') : '';
    } 
  }
});