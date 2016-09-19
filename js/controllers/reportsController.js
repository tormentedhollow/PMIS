'use strict';

app.controller('ReportsController',  function($scope, $mdEditDialog, ProvinceService, MFOFilterService, ByDistService, ByDistMFOService, AddRemarksDistrictService){

	$scope.isLoading = true;
	$scope.isSubmit = true;
	MFOFilterService.async().then(function(d){
	  if(angular.isUndefined(d.data)) $scope.mfos = [];
	  else  $scope.mfos = d.data;
	  $scope.isLoading = false;
	  console.log($scope.mfos);
	});

	ProvinceService.async().then(function(d){
			if(angular.isUndefined(d.data)) $scope.doc.forOptions = [];
			else {
				$scope.get = {
					forOptions: d.data.data,
					forProv: null,
					forDist: null			
				};
			}
		});
	
	$scope.submit = function(){
		$scope.isSubmitLoad = true;
		var promise = ByDistService.async($scope.get);
		promise.then(function(d){
			console.log(d.data);
			return ByDistMFOService.async(d.data.mun, $scope.get);
		}).then(function(d){
			console.log(d.data.data);
			$scope.mfosDistrict = d.data.data;
			$scope.isSubmit = false;
			$scope.isSubmitLoad = false;
		}).catch(function(errorMsg){
			console.log("Something went wrong : " + errorMsg);
		}).finally(function() {
		  console.log('This will always be called...');
		});
			
	}

	$scope.add = function (event, x) {
		console.log(x);
		var promise = $mdEditDialog.small({
			modelValue: x.remarks,
			placeholder: 'Add Remarks',
			save: function (input) {
				AddRemarksDistrictService.async(x, input.$modelValue, $scope.get).then(function(d){
					x.remarks = input.$modelValue;
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