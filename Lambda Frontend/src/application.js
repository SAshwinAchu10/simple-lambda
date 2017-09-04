'use strict';
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: true
		});
	}
]);

angular.element(document).ready(function() {
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});