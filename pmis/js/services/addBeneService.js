'use strict';

app.factory('AddBeneService',  ['$http', function($http) {

	var promise;
	var AddBeneService = {
		async: function(doc){	 
			if(!promise || promise){
				//alert("add");
				console.log(doc);
				promise = $http({
					method: 'post',
					url: 'ajax.php',
					data: $.param({'doc' : doc,'type' : 'add_bene' }),
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
	;return AddBeneService;

}]);