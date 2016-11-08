'use strict';

app.factory('viewObAdminService',  ['$http', function($http) {

	var promise;
	var viewObAdminService = {
		async: function(mon,bol){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'view_obadmin', 'mon' : mon,'bol':bol  }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return viewObAdminService;

}]);