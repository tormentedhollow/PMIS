'use strict';

app.controller('SettingsController', function($scope, $mdBottomSheet, loginService) {

	$scope.close = function() {
		$mdBottomSheet.hide();	 
	}

	$scope.logout = function(){
	  	loginService.logout();
	  	$mdBottomSheet.hide();
	}

	
});