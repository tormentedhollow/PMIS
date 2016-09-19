'use strict';

function ViewPhysicalController($scope, $mdDialog, mon,mfo,ta,unit,id, viewPService, MonthService) {
	//console.log(item);
	$scope.mon = mon;
	$scope.mfo = mfo;
	$scope.ta = ta;
	$scope.unit = unit;

	if(id==null||id==undefined){
		$scope.id = '';
	}else{
		$scope.id = id;
	}

	
	viewPService.async(mon,mfo,unit,ta,$scope.id).then(function(d){
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


  }

app.filter('sumByKey', function () {
	return function (data, key) {
		if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
	    return 0;
	}
	var sum = 0;
	for (var i = data.length - 1; i >= 0; i--) {
	    sum += parseFloat(data[i]['kilo']);
	}

	return sum;
	};
});