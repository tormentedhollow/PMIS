'use strict';

app.factory('ByDistMFOService',  ['$http', function($http) {
	var promise;
	var ByDistMFOService = {	
	async: function(muns, items){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
					url: 'ajax.php',
					data: $.param({'type' : 'getByDistrictMFO', 'muns':muns, 'provs':items.forProv,'dist':items.forDist}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).
				success(function(data, status, headers, config) {
					if(data.success){
						return data.data;
					}else{
						console.log("error mode - data success");
					}
				});
			}
		return promise;
		}
	};
	return ByDistMFOService;
}]);