'use strict';

app.factory('MFOBannerAllService',  ['$http', function($http) {

	var promise;
	var MFOBannerAllService = {
		async: function(id){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'getAllQuarterBanner', 'id':id }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return MFOBannerAllService;

}]);