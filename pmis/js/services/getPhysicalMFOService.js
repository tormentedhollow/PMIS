'use strict';

app.factory('getPhysicalMFOService',  ['$http', function($http) {

	var promise;
	var getPhysicalMFOService = {
		async: function(id){	 
			var progid=0;
			if(id!=null&&id!=undefined){
				progid=id;
			}
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'getPhysicalMFO', 'prog': progid }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						console.log("hello");
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return getPhysicalMFOService;

}]);