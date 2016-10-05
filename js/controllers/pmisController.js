'use strict';

app.controller('PmisController',  function($scope, $mdSidenav, $state, $mdDialog, $mdMedia, $mdBottomSheet, $cookies, $timeout, InitService){
$state.transitionTo('pmis'); //automatic defaultz 
$scope.isLoading = true;
$scope.toggleSearch = false;  
$scope.firstName =  $cookies.get('firstName');
$scope.lastName =  $cookies.get('lastName');
$scope.email =  $cookies.get('email');
$scope.username =  $cookies.get('username');
$scope.image =  $cookies.get('image');
$scope.pwd =  $cookies.get('password');
$scope.p_id =  $cookies.get('program_id');
console.log($scope.p_id);

InitService.async().then(function(d){
  if(angular.isUndefined(d.data)) $scope.mfos = [];
  else  $scope.mfos = d.data;
  $scope.isLoading = false;
  console.log($scope.mfos);
});

$scope.query = {
    limit: 10,
    page: 1
  };

  $scope.limitOptions = [5,10, 15, 20, 25, 30];

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

$scope.myBreakdown = function(id, mfos, ev, a){  //adding physical form 
  var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: AddBreakdownController,
    templateUrl: 'pages/addBreakdown.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,
    locals: {
     item: id,
     mfos: mfos,
     a: a
   },    
   fullscreen: useFullScreen
 });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.myBene = function(id, mfos, ev){  
  var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: AddBeneController,
    templateUrl: 'pages/addBene.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,
    locals: {
    item: id,
    mfos: mfos,
    inds: ''
   },    
   fullscreen: useFullScreen
 });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.myKilo = function(item, mfos, month, ev){  
  var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: MyKiloController,
    templateUrl: 'pages/myKilo.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,
    locals: {
     item: item,
     month: month,
     mfos: mfos
   },    
   fullscreen: useFullScreen
 });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.myBen = function(item, mfos, month, ev){  
  var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: MyBeneController,
    templateUrl: 'pages/myBene.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,
    locals: {
     item: item,
     month: month,
     mfos: mfos
   },    
   fullscreen: useFullScreen
 });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

    $scope.inputs = [
    {
      title: 'My WFP',
      icon: 'action:ic_dashboard_24px', // we have to use Google's naming convention for the IDs of the SVGs in the spritesheet
      sref: 'pmis'
    },
    {
      title: 'BEDs',
      icon: 'action:ic_view_week_24px',
      sref: 'beds'
    },
    {
      title: 'Quarter',
      icon: 'action:ic_today_24px',
      sref: 'quarter'
    },
          
  ];
  if(parseInt($scope.p_id)<17){
    var a={
      title: 'Beneficiary',
      icon: 'action:ic_face_24px',
      sref: 'beneficiary'
    };
    $scope.inputs.push(a);
  }

  $scope.outputs = [
  {
      title: 'Reports',
      icon: 'editor:ic_insert_chart_24px',
      sref: 'reports'
    },
     {
      title: 'My Performance',
      icon: 'editor:ic_show_chart_24px',
      sref: 'performance'
    }
  ];



		
});

app.filter('displaydate', function() {
    return function (input, tz) {
        return input.format('MMM Do, YYYY - hh:mm:ss A');
    };
});

