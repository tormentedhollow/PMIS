'use strict';

function AddBeneController($scope, $mdDialog, $mdToast,  $http, item, mfos, inds, MonthService, AddBeneService, ProvinceService, MunicipalService, BarangayService) {
	console.log(item);

	MonthService.async().then(function(d){
		$scope.months = d.data.data;			
	});

	ProvinceService.async().then(function(d){
		$scope.provinces = d.data.data;
	});

	MunicipalService.async().then(function(d){
		$scope.municipals = d.data.data;
	});

	BarangayService.async().then(function(d){
		$scope.barangays = d.data.data;
	});

  $http({
    method: 'post',
    url: 'ajax.php',
    data: $.param({'type' : 'getGroup' }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).
  success(function(data, status, headers, config) {
    if(data.success){
      $scope.groups = data.data; 
      console.log(data.data);        
    }else{
      alert("error mode - data success");
      console.log(data);
    }
  });

	$scope.temp = {
		male: 0,
		female: 0,
		month: null,
		mfo_id: item.mfo_id,
		index: item.ind,
		a: item.a // accomplishment
	};

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

$scope.save_individual = function(){
console.log($scope.temp);
var i = $scope.temp;
 $http({
    method: 'post',
    url: 'ajax.php',
    data: $.param({'doc' : $scope.temp, 'type' : 'add_individual' }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).
  success(function(data, status, headers, config) {
    if(data.success){
    	var mon = parseInt(i.month)-1; //to match the index in the page
    	if(inds[i.index]['total'][mon]['total']!=null)
				inds[i.index]['total'][mon]['total']=parseInt(inds[i.index]['total'][mon]['total'])+1;
			else 
				inds[i.index]['total'][mon]['total'] = 1;
    	$mdDialog.hide();	
			$mdToast.show(
				$mdToast.simple()
				.textContent('Beneficiary Successfully Added!')
				.position('bottom right')
				.hideDelay(3000)
				);
      
    }else{
      alert("error mode - data success");
      console.log(data);
    }
  });

}

	$scope.save = function() {
		AddBeneService.async($scope.temp).then(function(d) {
			if (d.data.success){
			var mon = parseInt(d.data.month)-1; //to match the index in the page
			if(mfos[d.data.index]['ben'][mon]['g']!=null)
				mfos[d.data.index]['ben'][mon]['g']=parseInt(d.data.g)+parseInt(mfos[d.data.index]['ben'][mon]['g']);
			else 
				mfos[d.data.index]['ben'][mon]['g'] = d.data.g;

			if(mfos[d.data.index]['ben'][mon]['b']!=null)
				mfos[d.data.index]['ben'][mon]['b']=parseInt(d.data.ben)+parseInt(mfos[d.data.index]['ben'][mon]['b']);
			else 
				mfos[d.data.index]['ben'][mon]['b'] = d.data.ben;

			console.log(d.data);

			$mdDialog.hide();	
			$mdToast.show(
				$mdToast.simple()
				.textContent('Beneficiary Successfully Added!')
				.position('bottom right')
				.hideDelay(3000)
				);

		}

	});
		

	};


}