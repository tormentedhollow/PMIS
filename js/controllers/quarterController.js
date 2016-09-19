'use strict';

app.controller('QuarterController',  function($scope, $mdMedia, $mdDialog, $mdEditDialog, MFOFilterService, AddObaService, AddRemarksService,$mdToast){
	$scope.toggleSearch = false;
	$scope.isLoading = true;

	MFOFilterService.async().then(function(d){
		if(angular.isUndefined(d.data)) $scope.mfos = [];
		else  $scope.mfos = d.data;
		$scope.isLoading = false;
		console.log($scope.mfos);
	});

	$scope.add = function(id, mfos, ev, a){  
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
		console.log(a);
		$mdDialog.show({
			controller: AddBreakdownController,
			templateUrl: 'pages/addBreakdown.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {
				item: id,
				mfos: mfos,
				a: a
			},    
			fullscreen: useFullScreen
		});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		});
	};

	$scope.view = function(item, mfos, month, ev, a){  
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
		$mdDialog.show({
			controller: ViewController,
			templateUrl: 'pages/viewKilo.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {
				item: item,
				month: month,
				mfos: mfos,
				a: a
			},    
			fullscreen: useFullScreen
		});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		});
	};

	$scope.add2 = function (event, x, mon) {
		console.log(x);
		var promise = $mdEditDialog.small({
			modelValue: parseInt(x.oba[mon].obl),
			placeholder: 'Add a financial obligation',
			save: function (input) {
				AddObaService.async(x, input.$modelValue, mon).then(function(d){
					console.log(d.data);
					$mdToast.show(
						$mdToast.simple()
						.textContent('Breakdown Successfully Added!')
						.position('bottom right')
						.hideDelay(3000)
						);
					x.oba[mon].obl = input.$modelValue;
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

	$scope.add3 = function (event, x, q) {
		console.log(x);
		var promise = $mdEditDialog.small({
			modelValue: x.remarks[q],
			placeholder: 'Add Remarks',
			save: function (input) {
				AddRemarksService.async(x, input.$modelValue, q).then(function(d){
					x.remarks[q] = input.$modelValue;
				});		
			},
			targetEvent: event,
			type: "string",
			validators: {
				'md-maxlength': 200
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



