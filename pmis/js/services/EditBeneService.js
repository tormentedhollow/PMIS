'use strict';

app.factory('EditBeneService',  ['$http', function($http) {

	var promise;
	var EditBeneService = {
		async: function(item){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
					url: 'ajax.php',
					data: $.param({'item' : item,'type' : 'edit_bene'}),
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
	;return EditBeneService;

}]);