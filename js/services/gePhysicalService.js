'use strict';

app.factory('gePhysicalService',  ['$http', function($http) {

	var promise;
	var gePhysicalService = {
		async: function(id){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'id':id, 'type' : 'getPhysical' }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return gePhysicalService;

}]);