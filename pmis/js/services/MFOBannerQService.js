'use strict';

app.factory('MFOBannerQService',  ['$http', function($http) {

	var promise;
	var MFOBannerQService = {
		async: function(id){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'getMFOQuarterBanner', 'id':id }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return MFOBannerQService;

}]);