'use strict';

app.controller('Corn2Controller',  function($scope, MFOBannerService, MFOBannerQService){

MFOBannerService.async(2).then(function(d){
  if(angular.isUndefined(d.data)) $scope.mfos = [];
  else  $scope.rice = d.data;
  $scope.isLoading = false;
});

MFOBannerQService.async(2).then(function(d){
  if(angular.isUndefined(d.data)) $scope.mfos = [];
  else  $scope.q1 = d.data;

  $scope.physTotal = d.data[16].q1kilo;
  $scope.physTotalA = d.data[17].q1akilo;

  $scope.physTotal2 = d.data[18].q1kilo;
  $scope.physTotalA2 = d.data[19].q1akilo;

  var jan = Math.round((d.data[0].kiloa.kiloa/d.data[0].kilo.kilo) * 10000)/100;
  var feb = Math.round((d.data[1].kiloa.kiloa/d.data[1].kilo.kilo) * 10000)/100;
  var mar = Math.round((d.data[2].kiloa.kiloa/d.data[2].kilo.kilo) * 10000)/100;
  var apr = Math.round((d.data[3].kiloa.kiloa/d.data[3].kilo.kilo) * 10000)/100;
  var may = Math.round((d.data[4].kiloa.kiloa/d.data[4].kilo.kilo) * 10000)/100;
  var jun = Math.round((d.data[5].kiloa.kiloa/d.data[5].kilo.kilo) * 10000)/100;
  var per_q1 = Math.round(($scope.physTotalA/$scope.physTotal) * 10000)/100;
  var per_q2 = Math.round(($scope.physTotalA2/$scope.physTotal2) * 10000)/100;
  if(jan>100) jan=100;
  if(feb>100) feb=100;
  if(mar>100) mar=100;
  if(apr>100) apr=100;
  if(may>100) may=100;
  if(jun>100) jun=100;
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

  $scope.myChart = chart1;
  $scope.myChart2 = chart2;

});
});
