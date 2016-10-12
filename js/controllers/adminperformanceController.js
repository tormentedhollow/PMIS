'use strict';

app.controller('AdminPerformanceController',  function($scope, $stateParams, $cookies,$mdMedia, $mdDialog, $http, MFOBannerQService, getMFONameService, gePhysicalBannerService, getUnitService, getPhysicalMFOService){
var id = $cookies.get('program_id');
$scope.isLoading = true;
$scope.date = new Date(); 
$scope.varid = id;

var foo = $stateParams; 
$scope.id = foo.id;
id=foo.id;
$scope.varid = id;

 $scope.header = [
    { title: 'Annual'},
    { title: 'Jan'},
    { title: 'Feb'},
    { title: 'Mar'},
    { title: 'Apr'},
    { title: 'May'},
    { title: 'Jun'},
    { title: 'Jul'},
    { title: 'Aug'} ,
    { title: 'Sep'} ,
    { title: 'Oct'} ,
    { title: 'Nov'} ,
    { title: 'Dec'}    
  ];

 MFOBannerQService.async(id).then(function(d){
  if(angular.isUndefined(d.data)) $scope.mfos = [];
  else  $scope.q1 = d.data;
  $scope.isLoading = false;
  $scope.ob_all = d.data[28].obl;
  if(d.data[28].obl==null||d.data[28].obl==undefined){
    $scope.ob_all=0;
  }
  $scope.finTotal = d.data[12].q1;
  $scope.finTotalA = d.data[13].q1a;

  $scope.finTotal2 = d.data[14].q1;
  $scope.finTotalA2 = d.data[15].q1a;
  console.log(d.data);

  $scope.ttl =0.0;
  if(!isNaN(parseFloat(d.data[12].q1))){
    $scope.ttl += parseFloat(d.data[12].q1);
  }
  if(!isNaN(parseFloat(d.data[14].q1))){
    $scope.ttl += parseFloat(d.data[14].q1);
  }
  if(!isNaN(parseFloat(d.data[16].q1))){
    $scope.ttl += parseFloat(d.data[16].q1);
  }
  if(!isNaN(parseFloat(d.data[18].q1))){
    $scope.ttl += parseFloat(d.data[18].q1);
  }

  $scope.ttla =0.0;
  if(!isNaN(parseFloat(d.data[13].q1a))){
    $scope.ttla += (Math.round(parseFloat(d.data[13].q1a)*100))/100;
    console.log(parseFloat(d.data[13].q1a));
  }
  if(!isNaN(parseFloat(d.data[15].q1a))){
    $scope.ttla += (Math.round(parseFloat(d.data[15].q1a)*100))/100;
    console.log(parseFloat(d.data[15].q1a));
  }
  if(!isNaN(parseFloat(d.data[17].q1a))){
    $scope.ttla += (Math.round(parseFloat(d.data[17].q1a)*100))/100;
    console.log(parseFloat(d.data[17].q1a));
  }
  if(!isNaN(parseFloat(d.data[19].q1a))){
    $scope.ttla += (Math.round(parseFloat(d.data[19].q1a)*100))/100;
    console.log(parseFloat(d.data[19].q1a));
  }
  //$scope.ttla = parseInt(d.data[13].q1a) + parseInt(d.data[15].q1a)+ parseInt(d.data[17].q1a)+ parseInt(d.data[19].q1a);

  var jan = Math.round((d.data[0].obaa/$scope.ob_all) * 10000)/100;
  var feb = Math.round((d.data[1].obaa/$scope.ob_all) * 10000)/100;
  var mar = Math.round((d.data[2].obaa/$scope.ob_all) * 10000)/100;
  var apr = Math.round((d.data[3].obaa/$scope.ob_all) * 10000)/100;
  var may = Math.round((d.data[4].obaa/$scope.ob_all) * 10000)/100;
  var jun = Math.round((d.data[5].obaa/$scope.ob_all) * 10000)/100;
  var jul = Math.round((d.data[6].obaa/$scope.ob_all) * 10000)/100;
  var aug = Math.round((d.data[7].obaa/$scope.ob_all) * 10000)/100;
  var sep = Math.round((d.data[8].obaa/$scope.ob_all) * 10000)/100;
  var oct = Math.round((d.data[9].obaa/$scope.ob_all) * 10000)/100;
  var nov = Math.round((d.data[10].obaa/$scope.ob_all) * 10000)/100;
  var dec = Math.round((d.data[11].obaa/$scope.ob_all) * 10000)/100;
  var per_q1 = Math.round((d.data[13].q1a/$scope.ob_all) * 10000)/100;
  var per_q2 = Math.round((d.data[15].q1a/$scope.ob_all) * 10000)/100;
  var per_q3 = Math.round((d.data[17].q1a/$scope.ob_all) * 10000)/100;
  var per_q4 = Math.round((d.data[19].q1a/$scope.ob_all) * 10000)/100;


  console.log($scope.q1);
  $scope.isLoading = false;

 var chart1 = {};
  var data = {};
  chart1.type = "ComboChart";
  //chart1.displayed = true;
  //chart1.vAxis= { viewWindow:{min:0}};
  data.cols = [
  {label: "Month",type: "string"}, 
  {label: "Percentage",type: "number"},
  {label: "Target",type: "number"}
  ];
  data.rows = [
  { c: [{v: "January"}, {v: jan, f: jan + "%"}, {v: 0}]}, 
  { c: [{v: "February"}, {v: feb, f: feb + "%"}, {v: 20}]}, 
  { c: [{v: "March"}, {v: mar, f: mar + "%"}, {v: 25} ]},
  { c: [{v: "April"}, {v: apr, f: apr + "%"}, {v: 30}]},
  { c: [{v: "May"}, {v: may, f: may + "%"}, {v: 40}]},
  { c: [{v: "June"}, {v: jun, f: jun + "%"}, {v: 50}]},
  { c: [{v: "July"}, {v: jul, f: jul + "%"}, {v: 60}]},
  { c: [{v: "August"}, {v: aug, f: aug + "%"}, {v: 70}]},
  { c: [{v: "September"}, {v: sep, f: sep + "%"}, {v: 90}]},
  { c: [{v: "October"}, {v: oct, f: oct + "%"}, {v: 93}]},
  { c: [{v: "November"}, {v: nov, f: nov + "%"}, {v: 97}]},
  { c: [{v: "December"}, {v: dec, f: dec + "%"}, {v: 100}]}
  ];
  chart1.data = data;
  chart1.options = {
     title:'Financial Performance',
     vAxis: {minValue: 100},
     seriesType: 'bars',
    series: {1: {type: 'line', color: 'deeppink'}}
  };
  $scope.myChart = chart1;
  console.log($scope.myChart);
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
getPhysicalMFOService.async(id).then(function(d){
console.log(d);  

try{
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
for(var c = 0;c<($scope.rowtotal.length);c++){
  if($scope.rowtotal[c]['cost']!=null)
    $scope.rowtotal[c]["rw"] = (Math.round((parseFloat($scope.rowtotal[c]['cost'])/parseFloat($scope.ob_all))*10000)/10000);
  else
    $scope.rowtotal[c]["rw"] = 0;
}


$scope.mfototal= new Array();
$scope.mfototalall= 0.0;

$scope.ttlunit=new Array();
$scope.ttlrw=new Array();
for(var d=0;d<$scope.unit.length;d++){
  var ttlunit= 0.0;
  var ttlrw= 0.0;
  var mt= new Array();
  mt['mfocost'] =0.0;
  mt['rw'] =0.0;
  mt['total'] =0.0;
  mt['totala'] =0.0;
  mt['p'] =0.0;
  mt['wp'] =0.0;
  for(var t=0;t<($scope.mfo).length;t++){
    if(!isNaN(parseFloat($scope.mfo[t]['total'][d][0])))
      ttlunit += parseFloat($scope.mfo[t]['total'][d][0]);

    if(!isNaN(parseFloat($scope.mfo[t]['total'][d]['mfocost'])))
      mt['mfocost'] += parseFloat($scope.mfo[t]['total'][d]['mfocost']);

    if(!isNaN(parseFloat($scope.mfo[t]['total'][d]['cost'])/parseFloat($scope.ob_all))){
      mt['rw'] = parseFloat($scope.mfo[t]['total'][d]['cost'])/parseFloat($scope.ob_all);
      ttlrw=mt['rw'];
    }

    if(!isNaN(parseFloat($scope.mfo[t]['total'][d][0])))
      mt['total'] +=parseFloat($scope.mfo[t]['total'][d][0]);
    if(!isNaN(parseFloat($scope.mfo[t]['totala'][d][0])))
      mt['totala'] +=parseFloat($scope.mfo[t]['totala'][d][0]);

    if(!isNaN(mt['totala']/mt['total']))
      mt['p'] =mt['totala']/mt['total'];
    if(!isNaN(mt['p']*mt['rw'])){
      mt['wp'] = mt['p']*mt['rw'];
    }

  }
  $scope.mfototalall+=mt['wp'];
  ($scope.mfototal).push(mt);
  ($scope.ttlunit).push(ttlunit);
  ($scope.ttlrw).push(ttlrw);
}

for(var t=0;t<($scope.mfo).length;t++){
  var wp= 0.0;
  var rw= 0.0;
  for(var d=0;d<$scope.unit.length;d++){
    //var ff = (parseFloat($scope.mfo[t].totala[d][0])/parseFloat($scope.mfo[t].total[d][0]))*(parseFloat($scope.mfo[t].total[d]['mfocost'])/parseFloat($scope.ob_all));
    var ff = (($scope.mfo[t].totala[d][0])/($scope.ttlunit[d]))*($scope.ttlrw[d]);
    var ffrw = $scope.mfo[t].total[d]['mfocost']/$scope.ob_all;
    if(!isNaN(ff))
      wp+=ff;

    if(!isNaN(ffrw))
      rw+=ffrw;
      
  }
  $scope.mfo[t]['twp']=wp;
  $scope.mfo[t]['trw']=rw;
}

console.log($scope.mfo);
/*$scope.mfottl = function(x){
  var x = x;
  for(){

  }
  ((x.totala[$index][0])/(x.total[$index][0]))*(x.total[$index]['mfocost']/ob_all)
  console.log(x);
  return x;
}*/

console.log($scope.ttlrw);
console.log($scope.mfototal);
$scope.calcAve($scope.rowtotal);

var chart2 = {};
  var data = {};
  chart2.type = "ColumnChart";
  chart2.displayed = true;
  //chart1.vAxis= { viewWindow:{min:0}};
  data.cols = [
  {label: "Units",type: "string"}, 
  {label: "Weighted Physical Target",type: "number"}, 
  {label: "Weighted Physical Accomplishment",type: "number"}, 
  ];
  data.rows=Array();
  var acc=0.0;
  var tar=0.0;
  for(var t=0;t<($scope.unit).length;t++){
    var rows={};
    rows['c'] = Array();
    rows['c'][0] = {v: $scope.unit[t].description};

    rows['c'][1]={};
    rows['c'][1]['v'] = Math.round(($scope.rowtotal[t].cost / $scope.ob_all)*10000)/100;
    rows['c'][1]['f'] = rows['c'][1]['v']+"%";

    if(!isNaN(rows['c'][1]['v']))
      tar +=rows['c'][1]['v'];

    rows['c'][2]={};
    rows['c'][2]['v'] = Math.round(((parseFloat($scope.rowtotal[t][0][1])/parseFloat($scope.rowtotal[t][0][0]))*($scope.rowtotal[t].cost / $scope.ob_all))*10000)/100;
    rows['c'][2]['f'] = rows['c'][2]['v']+"%";

    if(!isNaN(rows['c'][2]['v']))
      acc +=rows['c'][2]['v'];
    data.rows[t]=rows;
  }

    var rows={};
    rows['c'] = Array();
    rows['c'][0] = {v: "Total"};
    rows['c'][1]={};
    rows['c'][1]['v'] = tar;
    rows['c'][1]['f'] = rows['c'][1]['v']+"%";
    rows['c'][2]={};
    rows['c'][2]['v'] = Math.round(acc*10000)/10000;
    rows['c'][2]['f'] = rows['c'][2]['v']+"%";
    data.rows[t]=rows;

  chart2.data = data;
  chart2.options = {
     vAxis: {minValue: 100}
  };
  $scope.myChart2 = chart2;
 // console.log($scope.myChart2);

  var chart4 = {};
  var data2 = {};
  chart4.type = "ColumnChart";
 // chart4.displayed = true;

  data2.cols = [
  {label: "MFO",type: "string"}, 
  {label: "Weighted Physical Target",type: "number"}, 
  {label: "Weighted Physical Accomplishment",type: "number"}, 
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
    /*for(var d=0;d<$scope.unit.length;d++){
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
    data2.rows[t]=rows;*/

    data2.rows=Array();
  for(var t=0;t<($scope.mfo).length;t++){
    var rows={};
    rows['c'] = Array();
    rows['c'][0] = {v: $scope.mfo[t].header_id};
    /*for(var y=1;y<=12;y++){
      rows['c'][y]={};
      rows['c'][y]['v'] = Math.round(((parseFloat($scope.rowtotal[t][y][1])/parseFloat($scope.rowtotal[t][0][0]))*($scope.rowtotal[t].cost / $scope.ob_all))*10000)/100;
      rows['c'][y]['f'] = rows['c'][y]['v']+"%";
    }*/
    rows['c'][1]={};
    rows['c'][1]['v'] = Math.round($scope.mfo[t]['trw']*10000)/100;
    rows['c'][1]['f'] = rows['c'][1]['v']+"%";

    rows['c'][2]={};
    rows['c'][2]['v'] = Math.round($scope.mfo[t]['twp']*10000)/100;
    rows['c'][2]['f'] = rows['c'][2]['v']+"%";
    data2.rows[t]=rows;
  }
  //----------------
    var rows={};
    rows['c'] = Array();
    rows['c'][0] = {v: "Total"};
    /*for(var y=1;y<=12;y++){
      rows['c'][y]={};
      rows['c'][y]['v'] = Math.round(((parseFloat($scope.rowtotal[t][y][1])/parseFloat($scope.rowtotal[t][0][0]))*($scope.rowtotal[t].cost / $scope.ob_all))*10000)/100;
      rows['c'][y]['f'] = rows['c'][y]['v']+"%";
    }*/
    rows['c'][1]={};
    rows['c'][1]['v'] = 100;
    rows['c'][1]['f'] = rows['c'][1]['v']+"%";

    rows['c'][2]={};
    rows['c'][2]['v'] = Math.round($scope.mfototalall*10000)/100;
    rows['c'][2]['f'] = rows['c'][2]['v']+"%";
    data2.rows[t]=rows;
//----------------

  }

  chart4.data = data2;
  chart4.options = {
     title:'Physical Performance by MFO',
     vAxis: {minValue: 100},
     bars: 'vertical'
  };
  $scope.myChart4 = chart4;
  console.log($scope.myChart4);
}catch(err){
  console.log("error: no ob_all");
}

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
     id: id
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
     id: id
   },    
   fullscreen: useFullScreen
 });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.viewP = function(mfo, mon,unit,ta){
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
     id: id
   },    
   fullscreen: useFullScreen
 });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.viewBene = function(mon){
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: ViewBeneController,
    templateUrl: 'pages/viewBene.html',
    parent: angular.element(document.body),
    clickOutsideToClose:true,
    locals: {
     mon: mon
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
  $scope.perAveRW = Array();
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
  $scope.aveRW = $scope.ave;
  var sum=0.0;
  var sumRW=0.0;
  var list = list;
  console.log(list);
  if(list!=undefined){
    for(var s=0;s<list.length;s++){
      for(var x=0;x<=12;x++){
        sum = (Math.round(((parseFloat(list[s][x]['1'])/parseFloat(list[s]['0']['0'])))*10000)/100);
        sumRW = sum*parseFloat(list[s]['rw']);
        if(!isNaN(sum)){
          $scope.ave[x] += sum;
          $scope.aveRW[x] += sumRW;
        }
        if(x>0){
          if(s==0){
            $scope.perAve[x-1]= Array();
            $scope.perAveRW[x-1]= Array();
          }
          $scope.perAve[x-1][s] = (Math.round(((parseFloat(list[s][x]['1'])/parseFloat(list[s]['0']['0'])))*10000)/100);
          $scope.perAveRW[x-1][s] = (Math.round(((parseFloat(list[s][x]['1'])/parseFloat(list[s]['0']['0']))*(parseFloat(list[s]['cost']/$scope.ob_all)))*10000)/100);
          if(isNaN($scope.perAve[x-1][s]))
            $scope.perAve[x-1][s]=0.0;
          $scope.perAve[x-1]['description']=$scope.q1[x-1]['month'];
          if(isNaN($scope.perAveRW[x-1][s]))
            $scope.perAveRW[x-1][s]=0.0;
          $scope.perAveRW[x-1]['description']=$scope.q1[x-1]['month'];
        }
      }
      for(var f=0;f<($scope.perAve).length;f++){
        var x=$scope.perAve[f];
        var xRW=$scope.perAveRW[f];
        var sum = 0.0;
        var sumRW = 0.0;
        for(var c=0;c<(x.length);c++){
          sum += (Math.round(parseFloat(x[c])*100)/100);
          sumRW += (Math.round(parseFloat(xRW[c])*100)/100);
        }
        $scope.perAve[f]['ave'] =(Math.round((sum)*100)/100);
        $scope.perAve[f]['aveRW'] =(Math.round((sumRW)*100)/100);
        if(f==0){
          $scope.perAve[f]['sigma'] = $scope.perAve[f]['ave'];
          $scope.perAve[f]['sigmaRW'] = $scope.perAve[f]['aveRW'];
        }
        else{
          $scope.perAve[f]['sigma'] = Math.round(($scope.perAve[f-1]['sigma']+$scope.perAve[f]['ave'])*100)/100;
          $scope.perAve[f]['sigmaRW'] = Math.round(($scope.perAve[f-1]['sigmaRW']+$scope.perAve[f]['aveRW'])*100)/100;
        }
      }
  console.log($scope.perAve);
/*
      for(var x=0;x<=12;x++){
        console.log((parseFloat(list[s][x]['1'])/parseFloat(list[s]['0']['0'])));
      }
      $scope.ave['0'] += (Math.round((parseFloat(list[s]['0']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['1'] += (Math.round((parseFloat(list[s]['1']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['2'] += (Math.round((parseFloat(list[s]['2']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['3'] += (Math.round((parseFloat(list[s]['3']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['4'] += (Math.round((parseFloat(list[s]['4']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['5'] += (Math.round((parseFloat(list[s]['5']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['6'] += (Math.round((parseFloat(list[s]['6']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['7'] += (Math.round((parseFloat(list[s]['7']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['8'] += (Math.round((parseFloat(list[s]['8']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['9'] += (Math.round((parseFloat(list[s]['9']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['10'] += (Math.round((parseFloat(list[s]['10']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['11'] += (Math.round((parseFloat(list[s]['11']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);
      $scope.ave['12'] += (Math.round((parseFloat(list[s]['12']['1'])/parseFloat(list[s]['0']['0'])*10000)/list.length)/100);*/
    }
  }

  var chart3 = {};
  var data = {};
  chart3.type = "ColumnChart";
  //chart3.displayed = true;
  //chart1.vAxis= { viewWindow:{min:0}};
  data.cols = [
  {label: "Month",type: "string"}, 
  {label: "Percentage",type: "number"}
  ];
  var mo = Array();
  mo[1] = $scope.perAve[0]['sigmaRW'];
  mo[2] = $scope.perAve[1]['sigmaRW'];
  mo[3] = $scope.perAve[2]['sigmaRW'];
  mo[4] = $scope.perAve[3]['sigmaRW'];
  mo[5] = $scope.perAve[4]['sigmaRW'];
  mo[6] = $scope.perAve[5]['sigmaRW'];
  mo[7] = $scope.perAve[6]['sigmaRW'];
  mo[8] = $scope.perAve[7]['sigmaRW'];
  mo[9] = $scope.perAve[8]['sigmaRW'];
  mo[10] = $scope.perAve[9]['sigmaRW'];
  mo[11] = $scope.perAve[10]['sigmaRW'];
  mo[12] = $scope.perAve[11]['sigmaRW'];
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
     title:'Physical Performance',
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



