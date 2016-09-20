'use strict';

app.factory('MFOBannerService',  ['$http', function($http) {

	var promise;
	var MFOBannerService = {
		async: function(id){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'getMFOFilterBanner', 'id':id }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return MFOBannerService;

}]);