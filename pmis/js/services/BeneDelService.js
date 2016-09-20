'use strict';

app.factory('BeneDelService',  ['$http', function($http) {
	var promise;
	var BeneDelService = {	
	async: function(items){	 
			if(!promise || promise){
				//alert("delete");
				console.log(items);
				promise = $http({
					method: 'post',
					url: 'ajax.php',
					data: $.param({'id' : items.bene_id, 'type' : 'delete_bene', 'a':items.a }),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).
				success(function(data, status, headers, config) {
					if(data.success){
						console.log(data);
						return data.data;    				
					}else{
						alert("error mode - data success");
						console.log(data);
					}
				});
			}
		return promise;
		}
	};
	return BeneDelService;
}]);