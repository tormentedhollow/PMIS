'use strict';

app.controller('BedsController',  function($scope, $mdEditDialog, MFOFilterService, AddObService){
	$scope.isLoading = true;
	$scope.query = {
		limit: 10,
		page: 1
	};

	$scope.limitOptions = [10, 15, 20, 25, 30];

	MFOFilterService.async().then(function(d){
	  if(angular.isUndefined(d.data)) $scope.mfos = [];
	  else  $scope.mfos = d.data;
	  //$scope.ob_total = d.ob_total.obl;
	  $scope.isLoading = false;
	  console.log($scope.mfos);
	});

	$scope.add = function (event, mon, x) {
		console.log(x);
	  var promise = $mdEditDialog.small({
	    modelValue: parseFloat(x.ob[mon].obl),
	    placeholder: 'Add a financial obligation',
	    save: function (input) {
    		AddObService.async(x, input.$modelValue, mon).then(function(d){
				console.log(d.data);
				  x.ob[mon].obl = input.$modelValue;
				  console.log(x.ob[mon].obl);
				  if(x.ob[mon].obl=='0'){
				  	x.ob[mon].obl=null;
				  }
				  //$scope.ob_total = parseFloat($scope.ob_total) + parseFloat(input.$modelValue);
			});    
	    },
	    targetEvent: event,
	    type: "number",
	    validators: {
	      'step': .01
	    }
	  });

	  promise.then(function (ctrl) {
	    var input = ctrl.getInput();

	    input.$viewChangeListeners.push(function () {
	      input.$setValidity('0', input.$modelValue !== '0');
	    });
	  });
	};


});





