'use strict';

app.factory('ByDistService',  ['$http', function($http) {
	var promise;
	var datas = new Array();
	var ByDistService = {	
	async: function(items, x){	 
			if(!promise || promise){
				console.log(items);
				promise = $http({
					method: 'post',
					url: 'ajax.php',
					data: $.param({'type' : 'getByDistrict', 'provs':items.forProv,'dist':items.forDist,'mun':items.forMun }),
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
	return ByDistService;
}]);