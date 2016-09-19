'use strict';

app.factory('MonthService',  ['$http', function($http) {
	var promise;
	var MonthService = {

		async: function(){	
			if(!promise || promise){
				promise = $http({
					method: 'post',
					url: 'ajax.php',
					data: $.param({'type' : 'getMonth' }),
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
	return MonthService;
}]);