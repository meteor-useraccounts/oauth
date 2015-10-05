/* global
    UserAccounts: false,
    UALog: false,
    UAOAuthModule: false
*/
'use strict';


// ------------------------------------------
//  Logs the start of execution for this file
// ------------------------------------------
UALog.trace('Loading main.js');


UALog.trace('Adding oauth module');
UserAccounts.registerModule(new UAOAuthModule());
