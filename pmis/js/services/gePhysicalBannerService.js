'use strict';

app.factory('gePhysicalBannerService',  ['$http', function($http) {

	var promise;
	var gePhysicalBannerService = {
		async: function(id){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'id':id, 'type' : 'getPhysicalBanner' }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return gePhysicalBannerService;

}]);