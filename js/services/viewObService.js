'use strict';

app.factory('viewObService',  ['$http', function($http) {

	var promise;
	var viewObService = {
		async: function(mon,id){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
	      			url: 'ajax.php',
	      			data: $.param({ 'type' : 'view_ob', 'mon' : mon,'id':id  }),
	      			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(response) {
						console.log(response.data);
						return response.data;    								
				});
			}
		return promise;
		}	
	};
	;return viewObService;

}]);