'use strict';

function ViewBeneController($scope, $mdDialog, $http, mon, ProvinceService, MunicipalService, BarangayService) {
  mon = parseInt(mon) + 1;
  console.log(mon);
    $http({
    method: 'post',
    url: 'ajax.php',
    data: $.param({'type' : 'getIndividual', 'mon': mon}),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).
  success(function(data, status, headers, config) {
    if(data.success){
      $scope.individuals = data.data; 
      $scope.month_name = $scope.individuals[0].month_name;
      console.log(data.data); 
    }else{
      alert("error mode - data success");
      console.log(data);
    }
  });

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

 ProvinceService.async().then(function(d){
    $scope.provinces = d.data.data;
  });

  MunicipalService.async().then(function(d){
    $scope.municipals = d.data.data;
  });

  BarangayService.async().then(function(d){
    $scope.barangays = d.data.data;
  });
  }
