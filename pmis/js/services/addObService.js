'use strict';

app.factory('AddObService',  ['$http', function($http) {

	var promise;
	var AddObService = {
		async: function(x, input, mon){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
					url: 'ajax.php',
					data: $.param({'x' : x,'type' : 'add_ob', 'input':input, 'mon':mon }),
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
	;return AddObService;

}]);