'use strict';

app.controller('LoginController',  function($scope, $http, $mdToast, loginService) {

	$scope.login = function() {	
		loginService.async($scope.username, $scope.password).then(function(d) {
			if (d.data.success) {
				console.log(d.data);
			} else {
				$mdToast.show($mdToast.simple()
					.textContent('Login not correct')
					.position('top right')
					.theme('error-toast')
					.hideDelay(3000)
					);
			}

		}); 
	}
		
});
