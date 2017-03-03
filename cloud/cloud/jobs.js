var sendgridApiKey = '';
var rp = require('request-promise');
var Promise = require('bluebird');
var sg = require('sendgrid')(sendgridApiKey);

Parse.Cloud.job("sendAlerts", function(request, status) {
  var query = new Parse.Query('Alert')
  .include('user')
  .ascending('created_at');
  
  var helper = require('sendgrid').mail;
  var from_email = new helper.Email('calerts@forumone.com');
  
  query.find()
  .then(function(alerts) {
    console.log(alerts);
    var save = alerts.map(function(alert) {
      var to_email = new helper.Email(alert.get('user').get('email'));
      var subject = alert.get('title');
      var content = new helper.Content('text/plain', "See CAlerts for more information");
      var mail = new helper.Mail(from_email, subject, to_email, content);
      
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });
      
      sg.API(request, function(error, response) {});
      
      alert.set('sent', true);
      
      return alert;
    });
    
    return Parse.Object.saveAll(save);
  })
  .then(function() {
    status.success('');
  });
});