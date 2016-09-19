'use strict';

app.factory('MFOFilterService',  ['$http', function($http) {

	var promise;
	var MFOFilterService = {
		async: function(){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'getMFOFilter' }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return MFOFilterService;

}]);