'use strict';

app.factory('EditAccountService',  ['$http', function($http) {

	var promise;
	var EditAccountService = {
		async: function(item){	 
			console.log(item);
			if(!promise || promise){
				promise = $http({
					method: 'post',
					url: 'ajax.php',
					data: $.param({'item' : item,'type' : 'updateUser'}),
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
	;return EditAccountService;

}]);