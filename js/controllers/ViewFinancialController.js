'use strict';

function ViewFinancialController($scope, $mdDialog, mon,id, viewObService, viewObaService, MonthService) {
	//console.log(item);
	$scope.id =  id;
	$scope.mon = mon;
	console.log(id+" "+mon);
	viewObService.async(mon,$scope.id).then(function(d){
		console.log(d.data);
		$scope.ob = d.data;
	});	

	viewObaService.async(mon,$scope.id).then(function(d){
		console.log(d.data);
		$scope.oba = d.data;

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
		    sum += parseFloat(data[i]['financial_obligation']);
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