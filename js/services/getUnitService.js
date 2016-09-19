'use strict';

app.factory('getUnitService',  ['$http', function($http) {

	var promise;
	var getUnitService = {
		async: function(){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'getUnitMeasure' }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return getUnitService;

}]);