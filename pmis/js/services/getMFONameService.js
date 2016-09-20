'use strict';

app.factory('getMFONameService',  ['$http', function($http) {

	var promise;
	var getMFONameService = {
		async: function(){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'getMFOName' }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return getMFONameService;

}]);