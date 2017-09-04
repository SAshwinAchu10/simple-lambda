'use strict';

var ApplicationConfiguration = (function() {
	var applicationModuleName = 'schoolshopee';
	var applicationModuleVendorDependencies = ['ngResource', 'ui.router', 'angular-growl', 'ui.bootstrap'];
	var registerModule = function(moduleName, dependencies) {
		angular.module(moduleName, dependencies || []);
		angular.module(applicationModuleName).requires.push(moduleName);
	};
	
	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();