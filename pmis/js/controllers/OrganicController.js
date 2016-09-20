'use strict';

app.controller('OrganicController',  function($scope, MFOBannerService, MFOBannerQService){
$scope.isLoading = true;
$scope.toggleSearch = false;

MFOBannerService.async(5).then(function(d){
  if(angular.isUndefined(d.data)) $scope.mfos = [];
  else  $scope.rice = d.data;
  $scope.isLoading = false;
});

MFOBannerQService.async(5).then(function(d){
  if(angular.isUndefined(d.data)) $scope.mfos = [];
  else  $scope.q1 = d.data;
   $scope.ob_all = d.data[20].obl;
  $scope.finTotal = d.data[12].q1;
  $scope.finTotalA = d.data[13].q1a;

  $scope.finTotal2 = d.data[14].q1;
  $scope.finTotalA2 = d.data[15].q1a;

 var jan = Math.round((d.data[0].oba.obl/$scope.ob_all) * 10000)/100;
  var feb = Math.round((d.data[1].oba.obl/$scope.ob_all) * 10000)/100;
  var mar = Math.round((d.data[2].oba.obl/$scope.ob_all) * 10000)/100;
  var apr = Math.round((d.data[3].oba.obl/$scope.ob_all) * 10000)/100;
  var may = Math.round((d.data[4].oba.obl/$scope.ob_all) * 10000)/100;
  var jun = Math.round((d.data[5].oba.obl/$scope.ob_all) * 10000)/100;
  var per_q1 = Math.round((d.data[13].q1a/$scope.ob_all) * 10000)/100;
  var per_q2 = Math.round((d.data[15].q1a/$scope.ob_all) * 10000)/100;
  console.log($scope.q1);
  $scope.isLoading = false;

  var chart1 = {};
  var data = {};
  chart1.type = "google.charts.Bar";
  chart1.displayed = true;
  data.cols = [
  {label: "Month",type: "string"}, 
  {label: "Percentage",type: "number"}
  ];
  data.rows = [
  { c: [{v: "January"}, {v: jan, f: jan + "%"}]}, 
  { c: [{v: "February"}, {v: feb, f: feb + "%"}]}, 
  { c: [{v: "March"}, {v: mar, f: mar + "%"}]},
  { c: [{v: "Total-Q1"}, {v: per_q1,f: per_q1 + "%"}]}
  ];
  chart1.data = data;

  var chart2 = {};
  var data2 = {};
  chart2.type = "google.charts.Bar";
  chart2.displayed = true;
  data2.cols = [
  {label: "Month",type: "string"}, 
  {label: "Percentage",type: "number"}
  ];
  data2.rows = [
  { c: [{v: "April"}, {v: apr, f: apr + "%"}]}, 
  { c: [{v: "May"}, {v: may, f: may + "%"}]}, 
  { c: [{v: "June"}, {v: jun, f: jun + "%"}]},
  { c: [{v: "Total-Q2"}, {v: per_q2,f: per_q2 + "%"}]}
  ];
  chart2.data = data2;

  $scope.o_myChart = chart1;
  $scope.o_myChart2 = chart2;

});


$scope.query = {
  limit: 10,
  page: 1
};

$scope.limitOptions = [10, 15, 20, 25, 30];

});
