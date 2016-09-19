'use strict';

app.factory('gePhysicalByHeaderService',  ['$http', function($http) {

	var promise;
	var gePhysicalByHeaderService = {
		async: function(id){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'id':id, 'type' : 'getPhysicalByHeader' }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return gePhysicalByHeaderService;

}]);