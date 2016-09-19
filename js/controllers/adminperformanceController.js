'use strict';

app.controller('AdminPerformanceController',  function($scope, $stateParams,$http, $cookies,$mdMedia, $mdDialog, MFOBannerQService, getMFONameService, gePhysicalBannerService, getUnitService, getPhysicalMFOService){
var id = $cookies.get('program_id');
$scope.isLoading = true;
$scope.date = new Date(); 

var foo = $stateParams; 
$scope.id = foo.id;

 $scope.header = [
    { title: 'Annual'},
    { title: 'Jan'},
    { title: 'Feb'},
    { title: 'Mar'},
    { title: 'Apr'},
    { title: 'May'},
    { title: 'Jun'},
    { title: 'Sem'}   
  ];

 MFOBannerQService.async($scope.id).then(function(d){
  if(angular.isUndefined(d.data)) $scope.mfos = [];
  else  $scope.q1 = d.data;
  $scope.isLoading = false;
  $scope.ob_all = d.data[20].obl;
  $scope.finTotal = d.data[12].q1;
  $scope.finTotalA = d.data[13].q1a;

  $scope.finTotal2 = d.data[14].q1;
  $scope.finTotalA2 = d.data[15].q1a;

  $scope.semi = parseInt(d.data[12].q1) + parseInt(d.data[14].q1);
  $scope.semia = parseInt(d.data[13].q1a) + parseInt(d.data[15].q1a);

  var jan = Math.round((d.data[0].obaa/$scope.ob_all) * 10000)/100;
  var feb = Math.round((d.data[1].obaa/$scope.ob_all) * 10000)/100;
  var mar = Math.round((d.data[2].obaa/$scope.ob_all) * 10000)/100;
  var apr = Math.round((d.data[3].obaa/$scope.ob_all) * 10000)/100;
  var may = Math.round((d.data[4].obaa/$scope.ob_all) * 10000)/100;
  var jun = Math.round((d.data[5].obaa/$scope.ob_all) * 10000)/100;
  var per_q1 = Math.round((d.data[13].q1a/$scope.ob_all) * 10000)/100;
  var per_q2 = Math.round((d.data[15].q1a/$scope.ob_all) * 10000)/100;


  console.log($scope.q1);
  $scope.isLoading = false;

 var chart1 = {};
  var data = {};
  chart1.type = "ComboChart";
  chart1.displayed = true;
  //chart1.vAxis= { viewWindow:{min:0}};
  data.cols = [
  {label: "Month",type: "string"}, 
  {label: "Percentage",type: "number"},
  {label: "Target",type: "number"}
  ];
  data.rows = [
  { c: [{v: "January"}, {v: jan, f: jan + "%"}, {v: 0}]}, 
  { c: [{v: "February"}, {v: feb, f: feb + "%"}, {v: 20}]}, 
  { c: [{v: "March"}, {v: mar, f: mar + "%"}, {v: 25}]},
  { c: [{v: "April"}, {v: apr, f: apr + "%"}, {v: 30}]},
  { c: [{v: "May"}, {v: may, f: may + "%"}, {v: 40}]},
  { c: [{v: "June"}, {v: jun, f: jun + "%"}, {v: 50}]},
  { c: [{v: "July"}, {v: jun, f: jun + "%"}, {v: 60}]},
  { c: [{v: "August"}, {v: jun, f: jun + "%"}, {v: 70}]},
  { c: [{v: "September"}, {v: jun, f: jun + "%"}, {v: 90}]},
  { c: [{v: "October"}, {v: jun, f: jun + "%"}, {v: 93}]},
  { c: [{v: "November"}, {v: jun, f: jun + "%"}, {v: 97}]},
  { c: [{v: "December"}, {v: jun, f: jun + "%"}, {v: 100}]}
  ];
  chart1.data = data;
  chart1.options = {
     title:'Monthly Financial Performance',
     vAxis: {minValue: 100},
     seriesType: 'bars',
    series: {1: {type: 'line', color: 'deeppink'}}
  };
  $scope.myChart = chart1;
}); 

/*
$scope.unit = null;
//filter the unit_measure
getUnitService.async().then(function(d){
   console.log(d.data);
    return gePhysicalBannerService.async(d.data);
}).then(function(d){
  $scope.unit = d.data;
  console.log(d.data);
});

*/
getPhysicalMFOService.async($scope.id).then(function(d){
console.log(d);  
$scope.unit = d.data[0].total;
$scope.headers= new Array();
for(var c = 0;c<($scope.unit.length);c++){
  for(var x=0;x<$scope.header.length;x++){
    if(c==0&&x==0){
      $scope.headers[0]=$scope.header[x];
    }
    else{
      $scope.headers.push($scope.header[x]);
    }
    //$scope.headers.push($scope.header[x]);
    //console.log($scope.headers);
  }
}
console.log($scope.unit);
console.log($scope.headers);
$scope.mfo = d.data;
$scope.predicate = "header_id";
$scope.rowtotal = d.rowtotal;
console.log(d.rowtotal);
$scope.calcAve($scope.rowtotal);

var chart2 = {};
  var data = {};
  chart2.type = "ColumnChart";
  chart2.displayed = true;
  //chart1.vAxis= { viewWindow:{min:0}};
  data.cols = [
  {label: "Units",type: "string"}, 
  {label: "January",type: "number"}, 
  {label: "February",type: "number"}, 
  {label: "March",type: "number"}, 
  {label: "April",type: "number"}, 
  {label: "May",type: "number"}, 
  {label: "June",type: "number"}, 
  {label: "Semi",type: "number"}
  ];
  data.rows=Array();
  for(var t=0;t<($scope.unit).length;t++){
    var rows={};
    rows['c'] = Array();
    rows['c'][0] = {v: $scope.unit[t].description};
    for(var y=1;y<=6;y++){
      rows['c'][y]={};
      rows['c'][y]['v'] = Math.round(parseFloat($scope.rowtotal[t][y][1])/parseFloat($scope.rowtotal[t][0][0])*10000)/100;
      rows['c'][y]['f'] = rows['c'][y]['v']+"%";
    }
    rows['c'][7]={};
    rows['c'][7]['v'] = Math.round(parseFloat($scope.rowtotal[t][0][1])/parseFloat($scope.rowtotal[t][0][0])*10000)/100;
    rows['c'][7]['f'] = rows['c'][y]['v']+"%";
    data.rows[t]=rows;
  }
  chart2.data = data;
  chart2.options = {
     vAxis: {minValue: 100}
  };
  $scope.myChart2 = chart2;
  console.log($scope.myChart2);

  var chart4 = {};
  var data2 = {};
  chart4.type = "ColumnChart";
  chart4.displayed = true;

  data2.cols = [
  {label: "MFO",type: "string"}, 
  {label: "January",type: "number"}, 
  {label: "February",type: "number"}, 
  {label: "March",type: "number"}, 
  {label: "April",type: "number"}, 
  {label: "May",type: "number"}, 
  {label: "June",type: "number"}, 
  {label: "Semi",type: "number"}
  ];
  data2.rows=Array();
  console.log($scope.mfo);
  console.log($scope.unit);
  for(var t=0;t<($scope.mfo).length;t++){
    var j2jt=Array();var j2ja=Array();
    j2jt[0]=0.0;
    j2ja[0]=0.0;
    j2ja[1]=0.0;
    j2ja[2]=0.0;
    j2ja[3]=0.0;
    j2ja[4]=0.0;
    j2ja[5]=0.0;
    j2ja[6]=0.0;
    for(var d=0;d<$scope.unit.length;d++){
      for(var b=0;b<=6;b++){
        if(!isNaN(parseFloat($scope.mfo[t]['totala'][d][b])))
         j2ja[b]+= parseFloat($scope.mfo[t]['totala'][d][b]);
      }
      if(!isNaN(parseFloat($scope.mfo[t]['total'][d][0])))
        j2jt[0]+= parseFloat($scope.mfo[t]['total'][d][0]);
    }
    var rows={};
    rows['c'] = Array();
    rows['c'][0] = {v: $scope.mfo[t].header_id};
    for(var y=1;y<=6;y++){
      rows['c'][y]={};
      rows['c'][y]['v'] = Math.round(parseFloat(j2ja[y])/parseFloat(j2jt[0])*10000)/100;
      rows['c'][y]['f'] = rows['c'][y]['v']+"%";
    }
    rows['c'][7]={};
    rows['c'][7]['v'] = Math.round(parseFloat(j2ja[0])/parseFloat(j2jt[0])*10000)/100;
    rows['c'][7]['f'] = rows['c'][y]['v']+"%";
    data2.rows[t]=rows;
  }

  chart4.data = data2;
  chart4.options = {
     title:'Monthly Physical Performance by MFO',
     vAxis: {minValue: 100},
     bars: 'vertical'
  };
  $scope.myChart4 = chart4;
  console.log($scope.myChart4);

});
$scope.totalTSem = function(y){
  //console.log(y)
  var sumT = 0.0;
  for(var c=1;c<=6;c++){
    if(y[c][0]!=undefined||y[c][0]!=null){
      sumT += parseFloat(y[c][0]);
    }
    
  }
  return sumT;
}
$scope.totalASem = function(y){
  //console.log(y)
  var sumT = 0.0;
  for(var c=1;c<=6;c++){
    if(y[c][1]!=undefined||y[c][1]!=null){
      sumT += parseFloat(y[c][1]);
    }
    
  }
  return sumT;
}
$scope.view = function(mon, ev){
  console.log(mon);
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: ViewFinancialController,
    templateUrl: 'pages/viewFinancial.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,
    locals: {
     mon: mon,
     id: $scope.id
   },    
   fullscreen: useFullScreen
 });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.view2 = function(mon, ev){
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: ViewFinancialController,
    templateUrl: 'pages/viewFinancial2.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,
    locals: {
     mon: mon,
     id: $scope.id
   },    
   fullscreen: useFullScreen
 });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.viewP = function(mfo, mon,unit,ta){
  console.log($scope.id);
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: ViewPhysicalController,
    templateUrl: 'pages/viewPhysical.html',
    parent: angular.element(document.body),
    clickOutsideToClose:true,
    locals: {
     mon: mon,
     mfo: mfo,
     unit: unit,
     ta: ta,
     id: $scope.id
   },    
   fullscreen: useFullScreen
 });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.calcAve = function(list){
  console.log(list);
  $scope.perAve = Array();
  $scope.ave = Array();
  $scope.ave['0']=0.0;
  $scope.ave['1']=0.0;
  $scope.ave['2']=0.0;
  $scope.ave['3']=0.0;
  $scope.ave['4']=0.0;
  $scope.ave['5']=0.0;
  $scope.ave['6']=0.0;
  $scope.ave['7']=0.0;
  $scope.ave['8']=0.0;
  $scope.ave['9']=0.0;
  $scope.ave['10']=0.0;
  $scope.ave['11']=0.0;
  $scope.ave['12']=0.0;
  var sum=0.0;
  var list = list;
  if(list!=undefined){
    for(var s=0;s<list.length;s++){
      for(var x=0;x<=12;x++){
        sum = (Math.round((parseFloat(list[s][x]['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
        if(!isNaN(sum)){
          $scope.ave[x] += sum;
        }
        if(x>0){
          if(s==0){
            $scope.perAve[x-1]= Array();
          }
          $scope.perAve[x-1][s] = (Math.round((parseFloat(list[s][x]['1'])/parseFloat(list[s]['0']['0'])*10000))/100);
          if(isNaN($scope.perAve[x-1][s]))
            $scope.perAve[x-1][s]=0.0;
          $scope.perAve[x-1]['description']=$scope.q1[x-1]['month'];
        }
      }
      for(var f=0;f<($scope.perAve).length;f++){
        var x=$scope.perAve[f];
        var sum = 0.0;
        for(var c=0;c<(x.length);c++){
          sum += (Math.round(parseFloat(x[c])*100)/100);
        }
        $scope.perAve[f]['ave'] =(Math.round((sum/x.length)*100)/100);
        if(f==0){
          $scope.perAve[f]['sigma'] = $scope.perAve[f]['ave'];
        }
        else{
          $scope.perAve[f]['sigma'] = Math.round(($scope.perAve[f-1]['sigma']+$scope.perAve[f]['ave'])*100)/100;
        }
      }
      console.log($scope.q1);
    }
  }

  var chart3 = {};
  var data = {};
  chart3.type = "ColumnChart";
  chart3.displayed = true;
  //chart1.vAxis= { viewWindow:{min:0}};
  data.cols = [
  {label: "Month",type: "string"}, 
  {label: "Percentage",type: "number"}
  ];
  var mo = Array();
  mo[1] = $scope.perAve[0]['sigma'];
  mo[2] = $scope.perAve[1]['sigma'];
  mo[3] = $scope.perAve[2]['sigma'];
  mo[4] = $scope.perAve[3]['sigma'];
  mo[5] = $scope.perAve[4]['sigma'];
  mo[6] = $scope.perAve[5]['sigma'];
  mo[7] = $scope.perAve[6]['sigma'];
  mo[8] = $scope.perAve[7]['sigma'];
  mo[9] = $scope.perAve[8]['sigma'];
  mo[10] = $scope.perAve[9]['sigma'];
  mo[11] = $scope.perAve[10]['sigma'];
  mo[12] = $scope.perAve[11]['sigma'];
  data.rows = [
  { c: [{v: "January"}, {v: mo[1], f: mo[1] + "%"}]}, 
  { c: [{v: "February"}, {v: mo[2], f: mo[2] + "%"}]}, 
  { c: [{v: "March"}, {v: mo[3], f: mo[3] + "%"}]},
  { c: [{v: "April"}, {v: mo[4], f: mo[4] + "%"}]},
  { c: [{v: "May"}, {v: mo[5], f: mo[5] + "%"}]},
  { c: [{v: "June"}, {v: mo[6], f: mo[6] + "%"}]},
  { c: [{v: "July"}, {v: mo[7], f: mo[7] + "%"}]},
  { c: [{v: "August"}, {v: mo[8], f: mo[8] + "%"}]},
  { c: [{v: "September"}, {v: mo[9], f: mo[9] + "%"}]},
  { c: [{v: "October"}, {v: mo[10], f: mo[10] + "%"}]},
  { c: [{v: "November"}, {v: mo[11], f: mo[11] + "%"}]},
  { c: [{v: "December"}, {v: mo[12], f: mo[12] + "%"}]}
  ];
  chart3.data = data;
  chart3.options = {
     title:'Monthly Physical Performance',
     series: { 0: {color: 'deeppink'} },
    vAxis: {minValue: 100}
  };
  $scope.myChart3 = chart3;

};

/*----Beneficiary-------*/

 $http({
    method: 'post',
    url: 'ajax.php',
    data: $.param({'type' : 'getBeneTotal' }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).
  success(function(data, status, headers, config) {
    if(data.success){
      $scope.total = data.total;
      $scope.overall_bene = $scope.total[11]['rt'];
      $scope.bene = data.bene;
      console.log(data);        
    }else{
      alert("error mode - data success");
      console.log(data);
    }
  });

 $scope.pieBene = {};    
  $scope.pieBene.type = "PieChart";

  $scope.pieBene.data = {"cols": [
        {label: "Sex", type: "string"},
        {label: "Total", type: "number"}
    ], "rows": [
        {c: [
            {v: "Male"},
            {v: 52},
        ]},
        {c: [
            {v: "Female"},
            {v: 23}
        ]}
    ]};


 $scope.pieBene.options = {
        'title': 'Total Individuals Distribution Report by Sex'
    };

 $scope.barBene = {};   
 $scope.barBene.type = "BarChart";
 $scope.barBene.data = {"cols": [
        {label: "Quarter", type: "string"},
        {label: "Percentage", type: "number"}
    ], "rows": [
        {c: [
            {v: "Q1"},
            {v: 20, f: "20%"},
        ]},
        {c: [
            {v: "Q2"},
            {v: 25, f: "25%" }
        ]},
        {c: [
            {v: "Q3"},
            {v: 49, f: "49%" },
        ]},
        {c: [
            {v: "Q4"},
            {v: 80, f: "80%" },
        ]}
    ]};
     $scope.barBene.options = {
        'title': 'Quarterly Beneficiary Accomplishment Report'
    };

  });




