/* global
    capitalize: false,
    UserAccounts: false
*/
'use strict';

var atOAuthEvents = {
  "click .ua-oauth-btn": function(event, t) {
    event.preventDefault();
    event.currentTarget.blur();

    /*
    if (UserAccounts.disabled()) {
      return;
    }
    */

    // UserAccounts.setDisabled(true);
    // var parentData = Template.parentData();
    // var state = (parentData && parentData.state) || UserAccounts.getState();
    var serviceName = this._id;
    var methodName;
    if (serviceName === 'meteor-developer') {
      methodName = "loginWithMeteorDeveloperAccount";
    } else {
      methodName = "loginWith" + capitalize(serviceName);
    }
    var loginWithService = Meteor[methodName];

    var options = UserAccounts._modules.oauth.loginOptions[serviceName] || {};
    options.loginStyle = UserAccounts._modules.oauth.loginStyle;

    loginWithService(options, function(err) {
      // UserAccounts.setDisabled(false);
      if (err && err instanceof Accounts.LoginCancelledError) {
        // do nothing
      } else {
        // UserAccounts.submitCallback(err, state);
      }
    });
  }
};

Template.uaForm.events(atOAuthEvents);
