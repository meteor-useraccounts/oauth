/* global
    capitalize: false,
    UserAccounts: false,
    UALog: false,
    UAModule: false
*/
'use strict';


// ------------------------------------------
//  Logs the start of execution for this file
// ------------------------------------------
UALog.trace('Loading main.js');


// define the Student class
function UAOAuth() {
  // Call the parent constructor
  UAModule.call(this);

  this._id = 'oauth';
  this.loginStyle = 'popup';
  this.position = 30;
  this.template = 'uaOauth';
  this.btnTemplate = 'uaOAuthBtn';
  this.visible = true;
}


// inherit UAModule
UAOAuth.prototype = new UAModule();


// correct the constructor pointer because it points to UAModule
UAOAuth.prototype.constructor = UAOAuth;


UAOAuth.prototype.configure = function(options) {
  // UALog.trace('configure ' + this._id);
  // console.log(options);

  // TODO: pick up oauth options here
};


UAOAuth.prototype.icons = {
  'meteor-developer': 'fa fa-rocket'
};


UAOAuth.prototype.loginOptions = {};


UAOAuth.prototype.services = function() {
  UALog.trace('services');
  var self = this;

  if (!Accounts.loginServicesConfigured()) {
    return;
  }

  var services = _.chain(Accounts.loginServiceConfiguration.find().fetch())
    .map(function(service) {
      var name = service.service;
      return {
        _id: name,
        icon: self.getIcon(name),
        disabled: self.getDisabled(name),
        name: self.getName(name),
        btnClasses: self.skinClasses('button'),
        template: self.getBtnTemplate(name),
        text: self.getText(name),
      };
    })
    .sortBy('_id')
    .value();

  return services;
};


UAOAuth.prototype.getBtnTemplate = function(service) {
  return this.btnTemplate;
};


UAOAuth.prototype.getDisabled = function(service) {
  return;
};


UAOAuth.prototype.getIcon = function(service) {
  return this.icons[service] || 'fa fa-' + service;
};


UAOAuth.prototype.getName = function(service) {
  return service;
};


UAOAuth.prototype.getText = function(service) {
  // console.log('text');
  // console.dir(service);
  if (service === 'meteor-developer') {
    service = 'meteor';
  }
  var action = 'Log in With';

  return action + ' ' + capitalize(service);
};

UserAccounts._modules.oauth = new UAOAuth();
