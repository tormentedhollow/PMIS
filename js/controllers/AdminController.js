'use strict';

app.controller('AdminController',  function($scope, $mdSidenav, $state, $mdDialog, $mdMedia, $mdBottomSheet, $cookies, $timeout, getBannerService, MFOBannerAllService, getUnitService, getMFOHeaderService, gePhysicalService,gePhysicalByHeaderService,getPhysicalMFOService,MFOBannerQService){
$state.transitionTo('admin'); //automatic defaultz 
$scope.isLoading = true;
$scope.toggleSearch = false; 
$scope.date = new Date(); 
var datee = new Date();
$scope.name =  $cookies.get('name');
$scope.myChartObject = {};
$scope.myChartObject.type = "google.charts.Bar";
$scope.myChartObject2 = {};
$scope.myChartObject2.type = "BarChart"; 
$scope.myChartObject3 = {};
$scope.myChartObject3.type = "BarChart"; 
$scope.myChartObject4 = {};
$scope.myChartObject4.type = "BarChart"; 
$scope.myChartObjectt = {};
$scope.myChartObjectt.type="ColumnChart";
$scope.myChartObjectt.data = {
    "cols": [
    {label: "Month", type: "string"},
    {label: "Target", type: "number"},
    {label: "Accomplishment", type: "number"}],
    "rows": [{c:[{v: "Jan"}, {v: 2}, {v: 0}]},
    {c:[{v: "Feb"}, {v: 10}, {v: 8}]},
    {c:[{v: "Mar"}, {v: 25}, {v: 15}]},
    {c:[{v: "Apr"}, {v: 28}, {v: 20}]},
    {c:[{v: "Mar"}, {v: 30}, {v: 41}]},
    {c:[{v: "Apr"}, {v: 32}, {v: 41}]},
    {c:[{v: "May"}, {v: 35}, {v: 50}]},
    {c:[{v: "Jun"}, {v: 45}, {v: 52}]},
    {c:[{v: "Jul"}, {v: 50}, {v: 55}]},
    {c:[{v: "Aug"}, {v: 65}, {v: 55}]},
    {c:[{v: "Sep"}, {v: 78}, {v: 65}]},
    {c:[{v: "Oct"}, {v: 84}, {v: 68}]},
    {c:[{v: "Nov"}, {v: 96}, {v: 72}]},
    {c:[{v: "Dec"}, {v: 100}, {v: 79}]}]};
  $scope.myChartObjectt.options = {

  };

console.log($scope.myChartObjectt);

$('.collapsible').collapsible();
var r_p1, r_p2, r_pt, c_p1, c_p2, c_pt, h_p1, h_p2, h_pt,l_p1, l_p2, l_pt,o_p1, o_p2, o_pt, a_p1, a_p2, a_pt;
r_p1=r_p2=r_pt=c_p1=c_p2=c_pt=h_p1=h_p2=h_pt=l_p1=l_p2=l_pt=o_p1=o_p2=o_pt=a_p1=a_p2=a_pt=0;


getUnitService.async().then(function(d){
  return gePhysicalService.async(d.data);
}).then(function(d){
  $scope.unit = d.data;
  for(var i = 0; i < 8; i++){
      r_p1 += d.data[i].total[0].p1;
      r_p2 += d.data[i].total[0].p2;
      r_pt += d.data[i].total[0].pt;
      c_p1 += d.data[i].total[1].p1;
      c_p2 += d.data[i].total[1].p2;
      c_pt += d.data[i].total[1].pt;
      h_p1 += d.data[i].total[2].p1;
      h_p2 += d.data[i].total[2].p2;
      h_pt += d.data[i].total[2].pt;
      l_p1 += d.data[i].total[3].p1;
      l_p2 += d.data[i].total[3].p2;
      l_pt += d.data[i].total[3].pt;
      o_p1 += d.data[i].total[4].p1;
      o_p2 += d.data[i].total[4].p2;
      o_pt += d.data[i].total[4].pt;
      a_p1 += d.data[i].p1;
      a_p2 += d.data[i].p2;
      a_pt += d.data[i].pt;
  }
  $scope.r_p1 = r_p1;
  $scope.r_p2 = r_p2;
  $scope.r_pt = r_pt;
  $scope.c_p1 = c_p1;
  $scope.c_p2 = c_p2;
  $scope.c_pt = c_pt;
  $scope.h_p1 = h_p1;
  $scope.h_p2 = h_p2;
  $scope.h_pt = h_pt;
  $scope.l_p1 = l_p1;
  $scope.l_p2 = l_p2;
  $scope.l_pt = l_pt;
  $scope.o_p1 = o_p1;
  $scope.o_p2 = o_p2;
  $scope.o_pt = o_pt;
  $scope.a_p1 = a_p1;
  $scope.a_p2 = a_p2;
  $scope.a_pt = a_pt;

  $scope.p_banner = [
  {
    banner_name: "RICE",
    p1: r_p1/5,
    p2: r_p2/5,
    pt: r_pt/5
  },
   {
    banner_name: "CORN",
    p1: c_p1/4,
    p2: c_p2/4,
    pt: c_pt/4
  },
   {
    banner_name: "HVCDP",
    p1: h_p1/5,
    p2: h_p2/5,
    pt: h_pt/5
  },
   {
    banner_name: "LIVESTOCK",
    p1: l_p1/3,
    p2: l_p2/3,
    pt: l_pt/3
  },
   {
    banner_name: "ORGANIC",
    p1: o_p1/4,
    p2: o_p2/4,
    pt: o_pt/4
  }
  ];
$scope.p = 'pt'; //used to get orderBy
 $scope.myChartObject2.data = {
    "cols": [
    {id: "b", label: "Banners", type: "string"},
    {id: "q1", label: "Q1", type: "number"},
    {id: "q2", label: "Q2", type: "number"}
    ], 
  "rows": [
    {c: [ {v: "RICE"}, {v: Math.round((r_p1/5) * 10000)/100}, {v: Math.round((r_p2/5) * 10000)/100},]},
    {c: [ {v: "CORN"},{v: Math.round((c_p1/4) * 10000)/100},{v: Math.round((c_p2/4) * 10000)/100},]},
    {c: [ {v: "HVCDP"},{v: Math.round((h_p1/5) * 10000)/100},{v: Math.round((h_p2/5) * 10000)/100},]},
    {c: [ {v: "LIVESTOCK"},{v: Math.round((l_p1/3) * 10000)/100},{v: Math.round((l_p2/3) * 10000)/100},]},
    {c: [ {v: "ORGANIC"},{v: Math.round((o_p1/4) * 10000)/100},{v: Math.round((o_p2/4) * 10000)/100},]},
    {c: [ {v: "ALL"},{v: Math.round((a_p1/8) * 10000)/100},{v: Math.round((a_p2/8) * 10000)/100},]}
    ]};
  console.log($scope.p_banner);
});

getMFOHeaderService.async().then(function(d){
  $scope.mfoHead=d.data;
  console.log(d.data);
  return gePhysicalByHeaderService.async(d.data);
}).then(function(d){
  $scope.mfoHeader = d.data;
  console.log($scope.mfoHeader);

  $scope.sampledata = new Array();
  for(var g=0;g<($scope.mfoHead).length;g++){
      var d = new Array();
      var w={"header_id":$scope.mfoHead[g].id};
      d.push(w);
    for(var b=1;b<=5;b++){
      var m = new Array();
      var div = new Array();
      for(var i=0;i<($scope.mfoHeader).length;i++){
        if($scope.mfoHeader[i]['program'] == b){
          for(var tl=0;tl<$scope.mfoHeader[i]['total'].length;tl++){
            if(div[tl]==undefined){
              div[tl]=0.0;
            }
            if(!isNaN(parseFloat($scope.mfoHeader[i]['total'][tl][0]))){
              div[tl]+=parseFloat($scope.mfoHeader[i]['total'][tl][0]);
            }
          }
        }
      }
      for(var i=0;i<($scope.mfoHeader).length;i++){
        if($scope.mfoHeader[i]['program'] == b && $scope.mfoHead[g].id==$scope.mfoHeader[i]['header_id']){
          var q1t=0.0;
          var q2t=0.0;
          for(var tl=0;tl<$scope.mfoHeader[i]['total'].length;tl++){
            var qq1=0.0;
            var qq2=0.0;
            for(var pa=1;pa<=6;pa++){
              if(pa<4){
                if(!isNaN(parseFloat($scope.mfoHeader[i]['totala'][tl][pa]))){
                  qq1 += parseFloat($scope.mfoHeader[i]['totala'][tl][pa]);
                }else{
                  qq1+=0;
                }
              }
              else if(pa>3&&pa<7){
                if(!isNaN(parseFloat($scope.mfoHeader[i]['totala'][tl][pa]))){
                  qq2 += parseFloat($scope.mfoHeader[i]['totala'][tl][pa]);
                }else{
                  qq2+=0;
                }
              }
            }
            //console.log(qq1+" / "+parseFloat($scope.mfoHeader[i]['total'][tl][0]));
            //console.log(qq2+" / "+parseFloat($scope.mfoHeader[i]['total'][tl][0]));
            //if(!isNaN(parseFloat($scope.mfoHeader[i]['total'][tl][0]))){
              q1t+=(qq1/div[tl]);
              q2t+=(qq2/div[tl]);
              console.log(q1t+" - "+q2t+" = "+b+" = "+$scope.mfoHead[g].id+" -- "+$scope.mfoHeader[i]['total'].length);
            //}
          }
          q1t=(Math.round((q1t/$scope.mfoHeader[i]['total'].length)*10000))/10000;
          q2t=(Math.round((q2t/$scope.mfoHeader[i]['total'].length)*10000))/10000;
          var qqq = new Array();
          var z1={"q1":q1t};
          var z2={"q2":q2t};
          var z2={"q2":q2t};
          qqq.push(z1);
          qqq.push(z2);
          //var prgrm={"prgrm":b};
          //m.push(prgrm);
          m.push(qqq);
        }
      }
      d.push(m);
    }
    $scope.sampledata.push(d);
  }
  console.log($scope.sampledata);
  $scope.myChartObject4.data = {
    "cols": [
    {id: "b", label: "MFO", type: "string"},
    {id: "2.1", label: "2.1", type: "number"},
    {id: "2.2", label: "2.2", type: "number"},
    {id: "2.3", label: "2.3", type: "number"},
    {id: "2.4", label: "2.4", type: "number"},
    {id: "3", label: "3", type: "number"},
    {id: "5", label: "5", type: "number"},
    {id: "6", label: "6", type: "number"}
    ]};
    var progs = ["RICE","CORN","HVCDP","LIVESTOCK","ORGANIC"];
    $scope.myChartObject4.data.rows = [];
    for(var t=0; t<(progs).length;t++){
        $scope.myChartObject4.data.rows[t] = {};
        var c = [];
      var smpl = {};
      smpl.v = progs[t];
      c[0] = smpl;
      //$scope.myChartObject3.data.rows[0] = smpl1;
      for(var d=0; d<($scope.sampledata).length;d++){
        var smpl = {};
        console.log(d+" "+(t+1)+"");
        //console.log($scope.sampledata[d][t+1][0][0].q1);
        if($scope.sampledata[d][t+1][0]!=undefined){
          console.log($scope.sampledata[d][t+1]);
          smpl.v = ($scope.sampledata[d][t+1][0][0].q1+$scope.sampledata[d][t+1][0][1].q2)*100;
        }else{
          smpl.v=null;
        }
        if(smpl.v==0){
          smpl.v=null;
        }
        //smpl.v = d;
        c[d+1] = smpl;
      }
      $scope.myChartObject4.data.rows[t]['c'] = c;
    }
});

getBannerService.async().then(function(d){
  return MFOBannerAllService.async(d.data);
}).then(function(d){
   $scope.ban = d.data;
   $scope.predicate = 'per_fin';
   console.log($scope.ban);

   $scope.ob_all = d.ob_all;
   $scope.oba_all = d.oba_all;

  var r = parseInt(d.data[0].ob.obl)||0;
  var c = parseInt(d.data[1].ob.obl)||0;
  var h = parseInt(d.data[2].ob.obl)||0;
  var l = parseInt(d.data[3].ob.obl)||0;
  var o = parseInt(d.data[4].ob.obl)||0;
//------------Obligation Target---------------//
  var r_q1t =  (parseInt(d.data[0].total[0].ob.obl) || 0) + (parseInt(d.data[0].total[1].ob.obl) || 0) + (parseInt(d.data[0].total[2].ob.obl) || 0);
  var c_q1t =  (parseInt(d.data[1].total[0].ob.obl) || 0) + (parseInt(d.data[1].total[1].ob.obl) || 0) + (parseInt(d.data[1].total[2].ob.obl) || 0);
  var h_q1t =  (parseInt(d.data[2].total[0].ob.obl) || 0) + (parseInt(d.data[2].total[1].ob.obl) || 0) + (parseInt(d.data[2].total[2].ob.obl) || 0);
  var l_q1t =  (parseInt(d.data[3].total[0].ob.obl) || 0) + (parseInt(d.data[3].total[1].ob.obl) || 0) + (parseInt(d.data[3].total[2].ob.obl) || 0);
  var o_q1t =  (parseInt(d.data[4].total[0].ob.obl) || 0) + (parseInt(d.data[4].total[1].ob.obl) || 0) + (parseInt(d.data[4].total[2].ob.obl) || 0);  
 
  var r_q2t =  (parseInt(d.data[0].total[3].ob.obl) || 0) + (parseInt(d.data[0].total[4].ob.obl) || 0) + (parseInt(d.data[0].total[5].ob.obl) || 0);
  var c_q2t =  (parseInt(d.data[1].total[3].ob.obl) || 0) + (parseInt(d.data[1].total[4].ob.obl) || 0) + (parseInt(d.data[1].total[5].ob.obl) || 0);
  var h_q2t =  (parseInt(d.data[2].total[3].ob.obl) || 0) + (parseInt(d.data[2].total[4].ob.obl) || 0) + (parseInt(d.data[2].total[5].ob.obl) || 0);
  var l_q2t =  (parseInt(d.data[3].total[3].ob.obl) || 0) + (parseInt(d.data[3].total[4].ob.obl) || 0) + (parseInt(d.data[3].total[5].ob.obl) || 0);
  var o_q2t =  (parseInt(d.data[4].total[3].ob.obl) || 0) + (parseInt(d.data[4].total[4].ob.obl) || 0) + (parseInt(d.data[4].total[5].ob.obl) || 0); 

  var r_q3t =  (parseInt(d.data[0].total[6].ob.obl) || 0) + (parseInt(d.data[0].total[7].ob.obl) || 0) + (parseInt(d.data[0].total[8].ob.obl) || 0);
  var c_q3t =  (parseInt(d.data[1].total[6].ob.obl) || 0) + (parseInt(d.data[1].total[7].ob.obl) || 0) + (parseInt(d.data[1].total[8].ob.obl) || 0);
  var h_q3t =  (parseInt(d.data[2].total[6].ob.obl) || 0) + (parseInt(d.data[2].total[7].ob.obl) || 0) + (parseInt(d.data[2].total[8].ob.obl) || 0);
  var l_q3t =  (parseInt(d.data[3].total[6].ob.obl) || 0) + (parseInt(d.data[3].total[7].ob.obl) || 0) + (parseInt(d.data[3].total[8].ob.obl) || 0);
  var o_q3t =  (parseInt(d.data[4].total[6].ob.obl) || 0) + (parseInt(d.data[4].total[7].ob.obl) || 0) + (parseInt(d.data[4].total[8].ob.obl) || 0); 

  var r_q4t =  (parseInt(d.data[0].total[9].ob.obl) || 0) + (parseInt(d.data[0].total[10].ob.obl) || 0) + (parseInt(d.data[0].total[11].ob.obl) || 0);
  var c_q4t =  (parseInt(d.data[1].total[9].ob.obl) || 0) + (parseInt(d.data[1].total[10].ob.obl) || 0) + (parseInt(d.data[1].total[11].ob.obl) || 0);
  var h_q4t =  (parseInt(d.data[2].total[9].ob.obl) || 0) + (parseInt(d.data[2].total[10].ob.obl) || 0) + (parseInt(d.data[2].total[11].ob.obl) || 0);
  var l_q4t =  (parseInt(d.data[3].total[9].ob.obl) || 0) + (parseInt(d.data[3].total[10].ob.obl) || 0) + (parseInt(d.data[3].total[11].ob.obl) || 0);
  var o_q4t =  (parseInt(d.data[4].total[9].ob.obl) || 0) + (parseInt(d.data[4].total[10].ob.obl) || 0) + (parseInt(d.data[4].total[11].ob.obl) || 0); 


//------------Obligation Accomplishment---------------//
  var r_q1 =  (parseInt(d.data[0].total[0].oba.obl) || 0) + (parseInt(d.data[0].total[1].oba.obl) || 0) + (parseInt(d.data[0].total[2].oba.obl) || 0);
  var c_q1 =  (parseInt(d.data[1].total[0].oba.obl) || 0) + (parseInt(d.data[1].total[1].oba.obl) || 0) + (parseInt(d.data[1].total[2].oba.obl) || 0);
  var h_q1 =  (parseInt(d.data[2].total[0].oba.obl) || 0) + (parseInt(d.data[2].total[1].oba.obl) || 0) + (parseInt(d.data[2].total[2].oba.obl) || 0);
  var l_q1 =  (parseInt(d.data[3].total[0].oba.obl) || 0) + (parseInt(d.data[3].total[1].oba.obl) || 0) + (parseInt(d.data[3].total[2].oba.obl) || 0);
  var o_q1 =  (parseInt(d.data[4].total[0].oba.obl) || 0) + (parseInt(d.data[4].total[1].oba.obl) || 0) + (parseInt(d.data[4].total[2].oba.obl) || 0);  
  $scope.oba_q1 = r_q1 + c_q1 + h_q1 + l_q1 + o_q1;

  var r_q2 =  (parseInt(d.data[0].total[3].oba.obl) || 0) + (parseInt(d.data[0].total[4].oba.obl) || 0) + (parseInt(d.data[0].total[5].oba.obl) || 0);
  var c_q2 =  (parseInt(d.data[1].total[3].oba.obl) || 0) + (parseInt(d.data[1].total[4].oba.obl) || 0) + (parseInt(d.data[1].total[5].oba.obl) || 0);
  var h_q2 =  (parseInt(d.data[2].total[3].oba.obl) || 0) + (parseInt(d.data[2].total[4].oba.obl) || 0) + (parseInt(d.data[2].total[5].oba.obl) || 0);
  var l_q2 =  (parseInt(d.data[3].total[3].oba.obl) || 0) + (parseInt(d.data[3].total[4].oba.obl) || 0) + (parseInt(d.data[3].total[5].oba.obl) || 0);
  var o_q2 =  (parseInt(d.data[4].total[3].oba.obl) || 0) + (parseInt(d.data[4].total[4].oba.obl) || 0) + (parseInt(d.data[4].total[5].oba.obl) || 0); 
 $scope.oba_q2 = r_q2 + c_q2 + h_q2 + l_q2 + o_q2;

   $scope.myChartObject.data = {
    "cols": [
    {id: "b", label: "Banners", type: "string"},
    {id: "q1-t", label: "Q1-T", type: "number"},
    {id: "q2-t", label: "Q2-T", type: "number"},
    {id: "q3-t", label: "Q3-T", type: "number"},
    {id: "q4-t", label: "Q4-T", type: "number"},
    {id: "q1-a", label: "Q1-A", type: "number"},
    {id: "q2-a", label: "Q2-A", type: "number"},
    {id: "q3-a", label: "Q3-A", type: "number"},
    {id: "q4-a", label: "Q4-A", type: "number"}
    ], 
  "rows": [
    {c: [ {v: "RICE"}, {v: Math.round((r_q1t/r) * 10000)/100}, {v: Math.round((r_q2t/r) * 10000)/100}, {v: Math.round((r_q3t/r) * 10000)/100}, {v: Math.round((r_q4t/r) * 10000)/100},
                        {v: Math.round((r_q1/r) * 10000)/100}, {v: Math.round((r_q2/r) * 10000)/100}, {v: 10}, {v: 20}]},
    {c: [ {v: "CORN"},{v: Math.round((c_q1t/c) * 10000)/100}, {v: Math.round((c_q2t/c) * 10000)/100}, {v: Math.round((c_q3t/c) * 10000)/100}, {v: Math.round((c_q4t/c) * 10000)/100},
                      {v: Math.round((c_q1/c) * 10000)/100},{v: Math.round((c_q2/c) * 10000)/100}, {v: 5}, {v: 5}]},
    {c: [ {v: "HVCDP"},{v: Math.round((h_q1t/h) * 10000)/100}, {v: Math.round((h_q2t/h) * 10000)/100}, {v: Math.round((h_q3t/h) * 10000)/100}, {v: Math.round((h_q4t/h) * 10000)/100},
                      {v: Math.round((h_q1/h) * 10000)/100},{v: Math.round((h_q2/h) * 10000)/100}, {v: 10}, {v: 5}]},
    {c: [ {v: "LIVESTOCK"},{v: Math.round((l_q1t/l) * 10000)/100}, {v: Math.round((l_q2t/l) * 10000)/100}, {v: Math.round((l_q3t/l) * 10000)/100}, {v: Math.round((l_q4t/l) * 10000)/100},
                      {v: Math.round((l_q1/l) * 10000)/100},{v: Math.round((l_q2/l) * 10000)/100}, {v: 10}, {v: 20}]},
    {c: [ {v: "ORGANIC"},{v: Math.round((o_q1t/o) * 10000)/100}, {v: Math.round((o_q2t/o) * 10000)/100}, {v: Math.round((o_q3t/o) * 10000)/100}, {v: Math.round((o_q4t/o) * 10000)/100},
                      {v: Math.round((o_q1/o) * 10000)/100},{v: Math.round((o_q2/o) * 10000)/100}, {v: 10}, {v: 20}]},
    //{c: [ {v: "ALL"},{v: Math.round(($scope.oba_q1/$scope.ob_all) * 10000)/100},{v: Math.round(($scope.oba_q2/$scope.ob_all) * 10000)/100}, {v: 10}, {v: 20}]}
    ]};
    console.log($scope.unit);
    $scope.myChartObject3.data = {};
    $scope.myChartObject3.data.cols = [];
      var smpl1 = {};
      smpl1.id = "b";
      smpl1.label = "Unit";
      smpl1.type = "string";
      $scope.myChartObject3.data.cols[0] = smpl1;
      $scope.actr=[];
    for(var t=0; t<($scope.unit).length;t++){
      var smpl = {};
      smpl.id = $scope.unit[t]["description"];
      smpl.label = $scope.unit[t]["description"];
      smpl.type = "number";
      $scope.myChartObject3.data.cols[t+1] = smpl;

      $scope.unit[t]['total']
      for(var r=0; r<($scope.unit[t]['total']).length;r++){
        if($scope.unit[t]['total'][r]['k1']['k1']!=null&&$scope.unit[t]['total'][r]['k1']['k1']!=undefined){
          if($scope.actr[r]==undefined)
            $scope.actr[r]=1;
          else
            $scope.actr[r]++;
        }
      }
    }
console.log($scope.actr);
    $scope.myChartObject3.data.rows = [];
    for(var t=0; t<($scope.unit[0]['total']).length;t++){
        $scope.myChartObject3.data.rows[t] = {};
        var c = [];
      var smpl = {};
      smpl.v = $scope.unit[0]['total'][t]['prog']['name'];
      c[0] = smpl;
      //$scope.myChartObject3.data.rows[0] = smpl1;
      for(var d=0; d<($scope.unit).length;d++){
        var smpl = {};
        smpl.v = ((Math.round(parseFloat($scope.unit[d]['total'][t]['qt']['qt'])/parseFloat($scope.unit[d]['total'][t]['k1']['k1'])*10000))/100)/$scope.actr[t];
        //smpl.v = d;
        c[d+1] = smpl;
      }
      $scope.myChartObject3.data.rows[t]['c'] = c;
    }

    console.log($scope.myChartObject);
    console.log($scope.myChartObject3);
   /*$scope.myChartObject3.data = {
  "rows": [
    {c: [ {v: "RICE"}, {v: Math.round((r_q1/r) * 10000)/100}, {v: Math.round((r_q2/r) * 10000)/100},]},
    {c: [ {v: "CORN"},{v: Math.round((c_q1/c) * 10000)/100},{v: Math.round((c_q2/c) * 10000)/100},]},
    {c: [ {v: "HVCDP"},{v: Math.round((h_q1/h) * 10000)/100},{v: Math.round((h_q2/h) * 10000)/100},]},
    {c: [ {v: "LIVESTOCK"},{v: Math.round((l_q1/l) * 10000)/100},{v: Math.round((l_q2/l) * 10000)/100},]},
    {c: [ {v: "ORGANIC"},{v: Math.round((o_q1/o) * 10000)/100},{v: Math.round((o_q2/o) * 10000)/100},]},
    {c: [ {v: "ALL"},{v: Math.round(($scope.oba_q1/$scope.ob_all) * 10000)/100},{v: Math.round(($scope.oba_q2/$scope.ob_all) * 10000)/100},]}
    ]};*/
$scope.isLoading = false;
}).catch(function(errorMsg){
  console.log("Something went wrong : " + errorMsg);
}).finally(function() {
  console.log('This will always be called...');
});




$scope.myChartObject.options = {"isStacked":true,"width":1150,"height":500,"chart":{"style":{"background":{"fillColor":"#ffffff","fillOpacity":1,"strokeColor":"#ffffff","strokeWidth":1,"strokeOpacity":0},"chartArea":{"fillColor":"#ffffff","fillOpacity":1,"strokeColor":"#ffffff","strokeWidth":1,"strokeOpacity":0},"text":{"fontName":null,"fontSize":null},"title":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null}}},"vAxis":{"viewWindow":{"min":0,"max":100}},"series":{"4":{"targetAxisIndex":1,"axis":"1","title":null,"inLegend":null},"5":{"targetAxisIndex":1,"axis":"1","title":null,"inLegend":null},"6":{"targetAxisIndex":1,"axis":"1","title":null,"inLegend":null},"7":{"targetAxisIndex":1,"axis":"1","title":null,"inLegend":null},"all":{"axis":null,"title":null,"inLegend":null}},"stacked":true,"selectionMode":null,"groupSize":null,"legend":{"position":null,"style":{"container":{"valign":null},"text":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null},"title":{"max-lines":null}}},"axes":{"all":{"style":{"gridlines":{"strokeColor":null},"baseline":{"strokeColor":null}}},"domain":{"all":{"baseline":null,"discrete":true,"label":null,"gridlines":null,"range":{"min":null,"max":null},"format":{},"style":{"gridlines":{"strokeColor":null},"baseline":{"strokeColor":null},"label":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null},"ticks":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null},"text":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null}}}},"target":{"all":{"baseline":null,"discrete":true,"label":null,"gridlines":null,"range":{"min":null,"max":null},"format":{},"style":{"gridlines":{"strokeColor":null},"baseline":{"strokeColor":null},"label":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null},"ticks":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null},"text":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null}}}},"x":{"all":{"baseline":null,"discrete":true,"label":null,"gridlines":null,"range":{"min":null,"max":null},"format":{},"style":{"gridlines":{"strokeColor":null},"baseline":{"strokeColor":null},"label":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null},"ticks":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null},"text":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null}}}},"y":{"all":{"baseline":null,"discrete":true,"label":null,"gridlines":null,"range":{"min":0,"max":100},"format":{},"style":{"gridlines":{"strokeColor":null},"baseline":{"strokeColor":null},"label":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null},"ticks":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null},"text":{"fillColor":null,"opacity":null,"fontName":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null}}}}}}

  $scope.myChartObject2.options = {
    'title': 'Physical Summary Report by Quarter - 2016',
    'isStacked': true,
      width: 1200,
     height:500,
     hAxis: {
              viewWindow:{
                max:100,
              },
              gridlines: { count: 11 }
          }
  };
  $scope.myChartObject3.options = {
    'title': 'Physical Summary Report by Unit - 2016',
    'isStacked': true,
      width: 1200,
     height:700,
     hAxis: {
              viewWindow:{
                max:100,
              },
              gridlines: { count: 11 }
          }
  };

  $scope.myChartObject4.options = {
    'title': 'Physical Summary Report by MFO - 2016',
    'isStacked': true,
      width: 1200,
     height:700,
     hAxis: {
              viewWindow:{
                max:100,
              },
              gridlines: { count: 11 }
          }
  };

  $scope.query = {
    limit: 10,
    page: 1
  };

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

getPhysicalMFOService.async(1).then(function(d){
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
//$scope.calcAve($scope.rowtotal);

var chart2 = {};
  var data = {};
  chart2.type = "google.charts.Bar";
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
     title:'Monthly Financial Performance by Unit',
     width: 1200,
     height:500,
     vAxis: {minValue: 100},
     legend:{textStyle:{fontSize:10}},
     bars: 'vertical'
  };
  $scope.myChart2 = chart2;
  console.log($scope.myChart2);

  var chart4 = {};
  var data2 = {};
  chart4.type = "google.charts.Bar";
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
     title:'Monthly Financial Performance by MFO',
      width: 1200,
     height:500,
     vAxis: {minValue: 100},
     legend:{textStyle:{fontSize:10}},
     bars: 'vertical'
  };
  $scope.myChart4 = chart4;
  console.log($scope.myChart4);

});

MFOBannerQService.async(1).then(function(d){
  if(angular.isUndefined(d.data)) $scope.mfos = [];
  else  $scope.q1 = d.data;
  console.log($scope.q1);
}); 

  $scope.limitOptions = [10, 15, 20, 25, 30];

/*$scope.calcAve = function(list){
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
          //console.log($scope.q1);
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
  chart3.type = "google.charts.Bar";
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
     width: 1200,
     height:400,
     series: { 0: {color: 'deeppink'} },
     legend: {position: 'none'},
     vAxis: {gridlines:{ count: 100} }
  };
  $scope.myChart3 = chart3;

};*/


  $scope.openLeftMenu   = function() {
   $mdSidenav('left').toggle();   
 }

 $scope.closeSidenav   = function() {
  $mdSidenav('left').close();   
}


$scope.showGridBottomSheet = function() {
  $mdBottomSheet.show({
    templateUrl: 'pages/settings.html',
    controller: 'SettingsController',
    clickOutsideToClose: true
  });
}

$scope.currentTime = moment();
var tick = function() {
  $scope.currentTime = moment();
  $timeout(tick, 1000);
}
$timeout(tick, 1000);


$scope.banners = [
{
  title: 'RICE',
  sref: 'riceAdmin'
},
{
  title: 'CORN',
  sref: 'cornAdmin'
},
{
  title: 'HVCDP',
  sref: 'hvcdpAdmin'
},
{
  title: 'LIVESTOCK',
  sref: 'livestockAdmin'
},
{
  title: 'ORGANIC',
  sref: 'organicAdmin'
}       
];

$scope.banners2 = [
{
  title: 'RICE',
  sref: 'rice2'
},
{
  title: 'CORN',
  sref: 'corn2'
},
{
  title: 'HVCDP',
  sref: 'hvcdp2'
},
{
  title: 'LIVESTOCK',
  sref: 'livestock2'
},
{
  title: 'ORGANIC',
  sref: 'organic2'
}       
];

});

app.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);

app.filter('displaydate', function() {
  return function (input, tz) {
    return input.format('MMM Do, YYYY - hh:mm:ss A');
  };
});


