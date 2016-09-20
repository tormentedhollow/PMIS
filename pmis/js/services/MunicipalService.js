'use strict';

app.factory('MunicipalService',  ['$http', function($http) {
	var promise;
	var MunicipalService = {

		async: function(){	
			if(!promise || promise){
				promise = $http({
					method: 'post',
					url: 'ajax.php',
					data: $.param({'type' : 'getMunicipal' }),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).
				success(function(data, status, headers, config) {
					if(data.success){
						console.log(data);
						return data.data;    				
					}else{
						//alert("error mode - data success");
						console.log(data);
					}
				});
			}
			return promise;
		}	
	};
	return MunicipalService;
}]);