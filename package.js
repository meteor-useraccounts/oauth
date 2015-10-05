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
  git: 'https://github.com/meteor-useraccounts/oauth.git',
});

Package.onUse(function pkgOnUse(api) {
  api.versionsFrom('1.0');

  // Logger
  api.use([
    'service-configuration',
    'jag:pince@0.0.9',
    'underscore',
    'useraccounts:core@2.0.0',
  ], Both);

  api.imply([
    'service-configuration',
    'useraccounts:core',
  ], Both);

  api.use([
    'templating',
  ], Client);

  api.addFiles([
    'src/texts.js',
    'src/templates/ua_oauth.html',
    'src/templates/ua_oauth_btn.html',
    'src/templates/ua_oauth_btn.css',
  ], Client);

  api.addFiles([
    'src/_globals.js',
    'src/logger.js',
    'src/modules/oauth_module.js',
    'src/main.js',
  ], Both);
});
