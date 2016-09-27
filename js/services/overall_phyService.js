'use strict';

app.factory('overall_phyService',  ['$http', function($http) {

	var promise;
	var overall_phyService = {
		async: function(mon,mfo,unit,ta,id){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'overall_phy'}),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return overall_phyService;

}]);