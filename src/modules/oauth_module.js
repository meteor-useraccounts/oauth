/* global
    s: false,
    UALog: false,
    UAModule: false,
    UAOAuthModule: true,
    UserAccounts: false
*/
'use strict';


// ------------------------------------------
//  Logs the start of execution for this file
// ------------------------------------------
UALog.trace('Loading title_module.js');


// define the UAOAuthModule class
UAOAuthModule = function _UAOAuthModule() {
  var self = this;

  // Call the parent constructor
  UAModule.call(self);

  self._id = 'oauth';
  self.btnTemplate = 'uaOAuthBtn';
  self.loginStyle = 'popup';
  self.position = 30;
  self.skins = {};
  self.template = 'uaOauth';
  self.templateClass = 'oauth';
  self.visible = true;
};


// inherit UAModule
UAOAuthModule.prototype = new UAModule();

_.extend(UAOAuthModule.prototype, {

  // correct the constructor pointer because it points to UAModule
  constructor: UAOAuthModule,

  /**
   *
   */
  _events: {
    'click .ua-oauth-btn': function clickUAOAuthBtn(event) {
      var methodName;
      var oauthModule = UserAccounts._modules.oauth;
      var options;
      var loginService;
      var serviceName = this._id;
      // var parentData = Template.parentData();
      // var state = (parentData && parentData.state) ||
      //  UserAccounts.getState();
      //
      UALog.trace('UAOAuthModule.events.clickUAOAuthBtn');

      event.preventDefault();
      event.currentTarget.blur();

      /*
      if (UserAccounts.disabled()) {
        return;
      }
      */
      // UserAccounts.setDisabled(true);

      if (serviceName === 'meteor-developer') {
        serviceName = 'meteorDeveloperAccount';
      }
      methodName = 'loginWith' + s.capitalize(serviceName);
      loginService = Meteor[methodName];

      options = oauthModule.requestPermissions[serviceName] || {};
      options.loginStyle = oauthModule.loginStyle;

      loginService(options, function onLogin(err) {
        if (err) {
          throw new Error(err);
        }
        // UserAccounts.setDisabled(false);
        /*
        if (err && err instanceof Accounts.LoginCancelledError) {
          // do nothing
        } else {
          // UserAccounts.submitCallback(err, state);
        }
        */
      });
    },
  },

  /**
   *
   */
  icons: {
    'meteor-developer': 'fa fa-rocket',
  },

  /**
   *
   */
  requestPermissions: {},

  /**
   *
   */
  texts: {
    'default': {
      btn: 'log_in_with',
    },
    signIn: {
      btn: 'log_in_with',
    },
    signUp: {
      btn: 'register_with',
    },
  },

  /**
   *
   */
  textTransforms: {
    'default': null,
    btn: s.titleize,
  },

  /**
   * configure - description
   *
   * @param  {type} options description
   * @return {type}         description
   */
  configure: function configure(options) {
    var self = this;
    var knownOpts = ['icons', 'requestPermissions', 'texts', 'textTransforms'];

    UALog.trace('UAOAuthModule.configure');

    // Possibly pick up values from the configuration options
    // TODO: check defaults for deep recursion
    _.each(knownOpts, function setOption(option) {
      self[option] = _.defaults(options[option] || {}, self[option]);
    });

    self.loginStyle = options.loginStyle || self.loginStyle;
    self.position = options.position || self.position;
    self.template = options.template || self.template;
    self.templateClass = options.templateClass || self.templateClass;
    self.btnTemplate = options.btnTemplate || self.btnTemplate;
  },

  /**
   * getDisabled - description
   *
   * @return {type}  description
   */
  getDisabled: function getDisabled() {
    UALog.trace('UAOAuthModule.getDisabled');

    return;
  },

  /**
   * getIcon - description
   *
   * @param  {type} service description
   * @return {type}         description
   */
  getIcon: function getIcon(service) {
    var self = this;

    UALog.trace('UAOAuthModule.getIcon');

    return self.icons[service];
  },

  /**
   * getName - description
   *
   * @param  {type} service description
   * @return {type}         description
   */
  getName: function getName(service) {
    var serviceName = service;

    UALog.trace('UAOAuthModule.getName');

    if (serviceName === 'meteor-developer') {
      serviceName = 'meteor';
    }
    return serviceName;
  },

  /**
   * init - description
   *
   * @return {type}  description
   */
  init: function init() {
    var self = this;

    UALog.trace('UAOAuthModule.init');

    if (Meteor.isClient) {
      Template.uaForm.events(self._events);
    }
  },

  /**
   * services - description
   *
   * @return {type}  description
   */
  services: function services() {
    var self = this;
    var oauthServices;
    var uaTmpl = Template.currentData().instance;

    UALog.trace('UAOAuthModule.services');

    if (!Accounts.loginServicesConfigured()) {
      return [];
    }
    oauthServices = Accounts.loginServiceConfiguration.find().fetch();
    oauthServices = _.chain(oauthServices)
      .map(function buildServiceObj(service) {
        var name = service.service;
        return {
          _id: name,
          instance: uaTmpl,
          module: self,
          name: self.getName(name),
        };
      })
      .sortBy('_id')
      .value();

    return oauthServices;
  },

  /**
   * uninit - description
   *
   * @return {type}  description
   */
  uninit: function uninit() {
    var self = this;

    UALog.trace('UAOAuthModule.uninit');

    if (Meteor.isClient) {
      _.each(self._events, function removeEvent(ev) {
        delete Template.uaForm.__eventMaps[ev];
      });
    }
  },
});
