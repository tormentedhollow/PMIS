'use strict';

app.factory('overall_phytopService',  ['$http', function($http) {

	var promise;
	var overall_phytopService = {
		async: function(mon,mfo,unit,ta,id){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'overall_phytop'}),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return overall_phytopService;

}]);