'use strict';

app.factory('viewPService',  ['$http', function($http) {

	var promise;
	var viewPService = {
		async: function(mon,mfo,unit,ta,id){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'view_P', 'mon' : mon , 'mfo' : mfo, 'unit' : unit, 'ta' : ta, 'id' : id }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return viewPService;

}]);