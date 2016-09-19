'use strict';

function AddGroupController($scope, $mdDialog, $mdToast, groups, ProvinceService, MunicipalService, BarangayService, AddGroupService) {

  ProvinceService.async().then(function(d){
    $scope.provinces = d.data.data;
  });

  MunicipalService.async().then(function(d){
   $scope.municipals = d.data.data;
  });

 BarangayService.async().then(function(d){
  console.log(d);
  $scope.barangays = d.data.data;
});


 $scope.cancel = function() {
  $mdDialog.cancel();
};

 $scope.save = function() {
  console.log($scope.temp)
    AddGroupService.async($scope.temp).then(function(d) {
      if (d.data.success){
        groups.push({
          id: groups.length+1,
          name: $scope.temp.name,
          province: $scope.temp.provs,
          municipal: $scope.temp.muns,
          barangay: $scope.temp.brgy,
          contact: $scope.temp.contact,
          email: $scope.temp.email,
          total: 0
        });
        $mdDialog.hide(); 
        $mdToast.show(
        $mdToast.simple()
        .textContent('New Group Successfully Added!')
        .position('bottom right')
        .hideDelay(3000)
        );

      }
    });
};


}