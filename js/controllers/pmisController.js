'use strict';

app.controller('PmisController',  function($scope, $mdSidenav, $state, $mdDialog, $mdMedia, $mdBottomSheet, $cookies, $timeout, $q, $http,  InitService, ChatService){
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
$scope.image =  $cookies.get('image');
console.log($scope.p_id);

$scope.currentTime = new moment();
var tick = function() {
    $scope.currentTime = new moment();
    $timeout(tick, 1000);
}
$timeout(tick, 1000);

InitService.async().then(function(d){
  if(angular.isUndefined(d.data)) $scope.mfos = [];
  else  $scope.mfos = d.data;
  $scope.isLoading = false;
  console.log($scope.mfos);
});

ChatService.async().then(function(d){
  if(angular.isUndefined(d.data)) $scope.messages = [];
  else  $scope.messages = d.data;
  //console.log($scope.mess);
});

  $scope.getDuration = function(start, end) {
    try {
      return ((moment.duration(end - start)).humanize());
    } catch (e) {
      return "Cant evaluate"
    }
  };

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

$scope.openChat   = function() {
 $mdSidenav('right').toggle();   
}


$scope.showGridBottomSheet = function() {
  $mdBottomSheet.show({
    templateUrl: 'pages/settings.html',
    controller: 'SettingsController',
    clickOutsideToClose: true
  });
}

/*$scope.currentTime = moment();
var tick = function() {
    $scope.currentTime = moment();
    $timeout(tick, 1000);
}
$timeout(tick, 1000);*/

var socket = io.connect( 'http://'+window.location.hostname+':3000' ); 
socket.on( 'new_message', function( data ) {  
  $scope.messages.push({username:data.username, image: data.image, message: data.message, time_created: data.time_created});
      
});
$scope.sendMessage = function(){
  if($scope.msg){
    $http({
        method: 'post',
        url: 'ajax.php',
        data: $.param({ 'type' : 'saveMessage', 'msg':$scope.msg }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(response) {
        //$scope.messages.push({username:$scope.username, image: $scope.image, message: $scope.msg, time_created: new Date()});
        console.log($scope.messages);
    
        //var socket = io(); 
        socket.emit('new_message', { 
                  username: $scope.username,
                  image: $scope.image,
                  message: $scope.msg,
                  time_created: new Date()
                });
        $scope.msg = null;   
      });
    }
};

var imagePath = 'images/avatar/avatar.png';


//---------------------------------------------------------------------------

 $scope.messages = [];
    $scope.status = {
        loading: false,
        loaded: false
    };

    $scope.counter = 8;
    $scope.loadMore = function() {
        var deferred = $q.defer();
        if (!$scope.status.loading && $scope.messages.length>=$scope.counter) {
            $scope.status.loading = true;
            // simulate an ajax request
            $timeout(function() {
              $scope.counter += 5;
                /*for (var i = 0; i < 10; i++) {
                    $scope.messages.unshift({
                        id: counter,
                        face : imagePath,
                        what: 'Brunch this weekend?',
                        who: 'Min Li Chan',
                        when: '3:08PM',
                        notes: " I'll be in your neighborhood doing errands"
                    });
                    counter += 10;
                }
                */
                $scope.status.loading = false;
               // $scope.status.loaded = ($scope.messages.length > 0);
                deferred.resolve();
            }, 2000);
        } else {
            deferred.reject();
        }
        return deferred.promise;
    };

    $scope.loadMore();

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

