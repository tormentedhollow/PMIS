'use strict';

function ViewObAdminController($scope, $mdDialog, mon,bol, viewObAdminService, MonthService) {
	//console.log(item);
	$scope.bol =  bol;
	$scope.mon = mon;
	viewObAdminService.async(mon,$scope.bol).then(function(d){
		console.log(d.data);
		$scope.ob = d.data;
	});	

	

	MonthService.async().then(function(d){
		$scope.months = d.data.data;
		console.log(d.data);
	});

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.sumation = function(data){
		var sum = 0;
		for (var i = data.length - 1; i >= 0; i--) {
			if(!isNaN(parseFloat(data[i]['financial_obligation']))){
		    	sum += parseFloat(data[i]['financial_obligation']);
		   	}else{
		   		sum +=0;
		   	}
		}
		return sum;
	}
  }

app.filter('sumByKey', function () {
	console.log("sum");
	return function (data, key) {
		if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
	    return 0;
	}
	var sum = 0;
	for (var i = data.length - 1; i >= 0; i--) {
	    sum += parseFloat(data[i]['financial_obligation']);
	}

	return sum;
	};
});