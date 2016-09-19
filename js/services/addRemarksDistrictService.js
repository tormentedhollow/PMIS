'use strict';

app.factory('AddRemarksDistrictService',  ['$http', function($http) {

	var promise;
	var AddRemarksService = {
		async: function(x, input, items){	 
			if(!promise || promise){
				promise = $http({
					method: 'post',
					url: 'ajax.php',
					data: $.param({'x' : x,'type' : 'add_remarksDistrict', 'input':input,
						'provs':items.forProv,'dist':items.forDist}),
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
	;return AddRemarksService;

}]);