'use strict';

app.controller('BeneficiaryController',  function($scope, $http, $mdMedia, $mdToast, $mdDialog, ProvinceService, MunicipalService, BarangayService, GroupDelService, EditGroupService){
  $scope.toggleSearch = false;
  $scope.isLoading = true;
  $scope.selected={};

 /* $http({
    method: 'post',
    url: 'ajax.php',
    data: $.param({'type' : 'getBeneMFO' }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).
  success(function(data, status, headers, config) {
    if(data.success){
      $scope.isLoading = false;
      $scope.mfos = data.data; 
      console.log(data.data);        
    }else{
      alert("error mode - data success");
      console.log(data);
    }
  });
*/
  $http({
    method: 'post',
    url: 'ajax.php',
    data: $.param({'type' : 'getGroup' }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).
  success(function(data, status, headers, config) {
    if(data.success){
      $scope.groups = data.data; 
      $scope.isLoading = false;
      console.log(data.data);        
    }else{
      alert("error mode - data success");
      console.log(data);
    }
  });

  $http({
    method: 'post',
    url: 'ajax.php',
    data: $.param({'type' : 'getIndiMFO' }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).
  success(function(data, status, headers, config) {
    if(data.success){
      $scope.inds = data.data; 
     $scope.isLoading = false;
      console.log(data.data);        
    }else{
      alert("error mode - data success");
      console.log(data);
    }
  });

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

  $scope.getTemplate = function (x) {
    if (x.id === $scope.selected.id) return 'edit-group';
    else return 'display-group';
  };

  $scope.reset = function () {
    $scope.selected = {};
    return 'display-group';
  };

  $scope.edit = function(item){
    $scope.selected = angular.copy(item);
    $scope.selected.index = $scope.groups.indexOf(item);
    console.log($scope.selected);
  };

  $scope.del = function(item){
    console.log(item);
  $("#dialog-confirm").html("These groups will be permanently deleted and cannot be recovered. Are you sure?");  
  // Define the Dialog and its properties.
  $("#dialog-confirm").dialog({
    resizable: false,
    modal: true,
    title: "Delete group?",
    height: 250,
    width: 400,
    buttons: {
      "Yes": function () {  
        $(this).dialog('close');  
        GroupDelService.async(item).then(function(d) {
          console.log(d.data);              
          $scope.groups.splice($scope.groups.indexOf(item), 1 );
          $mdToast.show(
            $mdToast.simple()
            .textContent('Group Successfully Deleted!')
            .position('bottom right')
            .hideDelay(3000)
            );
      });
      },
      "No": function () {
        $(this).dialog('close');
      }
    }
  }); 
};

  $scope.save = function(item){
    console.log(item);
    var index = item.index;
    EditGroupService.async(item).then(function(d) {
      if(d.data.success){
        console.log(d.data);
        $scope.selected = {};
        $scope.groups[index]['name']= item.name;
        $scope.groups[index]['province']= item.province;
        $scope.groups[index]['municipal']= item.municipal;
        $scope.groups[index]['barangay']= item.barangay;
        $scope.groups[index]['contact']= item.contact;
        $scope.groups[index]['email']= item.email;
  
        $mdToast.show(
            $mdToast.simple()
            .textContent('Group Successfully Updated!')
            .position('bottom right')
            .hideDelay(3000)
          );
      }else{
        alert("error");
      }

    });
 
 };

$scope.individual = function(id, inds, ev){  
  var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: AddBeneController,
    templateUrl: 'pages/addIndividuals.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,
    locals: {
      item: id,
      inds: inds,
      mfos: ''
    },    
    fullscreen: useFullScreen
  });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.group = function(groups,ev){  
  var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: AddGroupController,
    templateUrl: 'pages/addGroups.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,  
    locals: {
      groups: groups
    }, 
    fullscreen: useFullScreen
  });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.myInd = function(x,inds, mon, ev){  
  var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: ViewIndividualController,
    templateUrl: 'pages/viewIndividual.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,  
    locals: {
      x: x,
      inds: inds,
      mon: mon
    }, 
    fullscreen: useFullScreen
  });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.myInd2 = function(x,inds, ev){  //view individual according to group
  var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: ViewIndividualController,
    templateUrl: 'pages/viewIndividual2.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,  
    locals: {
      x: x,
      inds: inds,
      mon: '0'
    }, 
    fullscreen: useFullScreen
  });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};

$scope.view_service = function(x,inds, ev){  //view services according to group
  var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  $mdDialog.show({
    controller: ViewIndividualController,
    templateUrl: 'pages/viewService.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,  
    locals: {
      x: x,
      inds: inds,
      mon: '0'
    }, 
    fullscreen: useFullScreen
  });
  $scope.$watch(function() {
    return $mdMedia('xs') || $mdMedia('sm');
  });
};




});



