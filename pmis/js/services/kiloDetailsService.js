'use strict';

app.factory('kiloDetailsService',  ['$http', function($http) {

	var promise;
	var kiloDetailsService = {
		async: function(items, month, a){	 
			if(!promise || promise){
				promise = $http({
			      method: 'post',
			      url: 'ajax.php',
			      data: $.param({ 'type' : 'getkiloDetails', 'month' : month, 'mfo_id':items.mfo_id, 'a':a}),
			      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    }).
			    success(function(data, status, headers, config) {
			    	if(data.success){
			    		console.log(data);

			    	}else{
			    		console.log(data);
			    	}
			    }).
			    error(function(data, status, headers, config) {
			    	$scope.$parent.messageFailure(data.message);
			    });

			}
		return promise;
		}	
	};
	;return kiloDetailsService;

}]);