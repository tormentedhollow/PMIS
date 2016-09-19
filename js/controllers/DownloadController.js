'use strict';

app.controller('DownloadController',  function($scope, $timeout, Excel, MFOFilterService){
$scope.date = new Date();

  $scope.isLoading = true;
  $scope.isSubmit = true;
  MFOFilterService.async().then(function(d){
    if(angular.isUndefined(d.data)) $scope.mfos = [];
    else  $scope.mfos = d.data;
    $scope.isLoading = false;
    console.log($scope.mfos);
  }); 

 $scope.exportToExcel=function(tableId, fileName){ // ex: '#my-table'
            $scope.exportHref=Excel.tableToExcel(tableId,'sheet name');
            var a = document.createElement('a');          
            $timeout(function(){a.href=$scope.exportHref;a.download=fileName+'.xls';a.click();},100); // trigger download
        }

});



