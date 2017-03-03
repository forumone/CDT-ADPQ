angular.module('f1CdtAdpq').component('header', {
  templateUrl: 'components/header/header.html',
  controller: function(users) {
    this.user = users.current();
  }
});