// Package metadata for Meteor.js web platform (https://www.meteor.com/)
// This file is defined within the Meteor documentation at
//
//   http://docs.meteor.com/#/full/packagejs
//
// and it is needed to define a Meteor package
'use strict';


var Both = ['client', 'server'];
var Client = 'client';


Package.describe({
  name: 'useraccounts:oauth',
  summary: 'UserAccounts oauth package.',
  version: '2.0.0',
  git: 'https://github.com/meteor-useraccounts/oauth.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  // Logger
  api.use([
    'service-configuration',
    'jag:pince@0.0.5',
    'underscore',
    'useraccounts:core@2.0.0'
  ], Both);

  api.imply([
    'service-configuration',
    'useraccounts:core',
  ], Both);


  // Base Class instantiation
  api.addFiles([
    'src/_globals.js',
    'src/logger.js',
    'src/main.js'
  ], Both);


  api.use([
    'templating',
  ], Client);

  api.addFiles([
    'src/templates/ua_oauth.html',
    'src/templates/ua_oauth_btn.html',
    'src/templates/ua_oauth_btn.css',
    'src/utils.js',
    'src/events.js',
  ], Client);
});
