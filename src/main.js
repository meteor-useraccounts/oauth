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
  this.templateClass = 'oauth';
  this.btnTemplate = 'uaOAuthBtn';
  this.visible = true;
}


// inherit UAModule
UAOAuth.prototype = new UAModule();

_.extend(UAOAuth.prototype, {

  // correct the constructor pointer because it points to UAModule
  constructor: UAOAuth,

  configure: function(options) {
    // UALog.trace('configure ' + this._id);
    // console.log(options);

    // TODO: pick up oauth options here
  },

  icons: {
    'meteor-developer': 'fa fa-rocket'
  },

  texts: {
    default: {
      prefix: 'Login with',
      suffix: '',
    },
    signIn: {
      prefix: 'Login with',
      suffix: '',
    },
    signUp: {
      prefix: 'Register with',
      suffix: '',
    },
  },

  loginOptions: {},

  services: function() {
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
          text: self.getBtnText(name),
        };
      })
      .sortBy('_id')
      .value();

    return services;
  },

  getBtnTemplate: function(service) {
    return this.btnTemplate;
  },

  getDisabled: function(service) {
    return;
  },

  getIcon: function(service) {
    return this.icons[service] || 'fa fa-' + service;
  },

  getName: function(service) {
    return service;
  },

  getBtnText: function(service) {
    var
      self = this,
      prefix = self.getText('prefix'),
      suffix = self.getText('suffix')
    ;

    if (service === 'meteor-developer') {
      service = 'meteor';
    }

    return prefix + ' ' + capitalize(service) + ' ' + suffix;
  },
});


UALog.trace('Adding oauth module');
var oauth = new UAOAuth();
UserAccounts._modules.oauth = oauth;
UserAccounts.oauth = oauth;
