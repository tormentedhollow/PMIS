'use strict';
//mfos used to update the DOM
function ViewIndividualController($scope, $mdDialog, $http, $mdToast, x, inds, mon, ProvinceService, MunicipalService, BarangayService) {
  $scope.selected={};
  console.log(x);
  console.log(mon);
    $http({
    method: 'post',
    url: 'ajax.php',
    data: $.param({'type' : 'getIndividual', 'mon': mon, 'gid':x.id }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).
  success(function(data, status, headers, config) {
    if(data.success){
      $scope.individuals = data.data; 
      console.log(data.data); 
     $scope.temp = {
      month_name: $scope.individuals[0].month_name,
      group_name: x.name 
    };         
    }else{
      alert("error mode - data success");
      console.log(data);
    }
  });

  $http({
    method: 'post',
    url: 'ajax.php',
    data: $.param({'type' : 'getGroup' }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).
  success(function(data, status, headers, config) {
    if(data.success){
      $scope.groups = data.data; 
      console.log(data.data);        
    }else{
      alert("error mode - data success");
      console.log(data);
    }
  });

  $http({
    method: 'post',
    url: 'ajax.php',
    data: $.param({'type' : 'view_service', 'gid':x.id  }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).
  success(function(data, status, headers, config) {
    if(data.success){
      $scope.services = data.data; 
      console.log(data.data);         
    }else{
      alert("error mode - data success");
      console.log(data);
    }
  });

    $http({
    method: 'post',
    url: 'ajax.php',
    data: $.param({'type' : 'view_service_month', 'mon':mon  }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).
  success(function(data, status, headers, config) {
    if(data.success){
      $scope.group_rec = data.data; 
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
    $scope.barangays = d.data.data;
  });

  $scope.getTemplate = function (x) {
        if (x.id === $scope.selected.id) return 'editable';
        else return 'display';
    };
 
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.reset = function () {
    $scope.selected = {};
    return 'display';
  }

   $scope.save = function (item) {
   console.log(item);
  var index = item.index;
   $http({
          method: 'post',
          url: 'ajax.php',
          data: $.param({'item' : item,'type' : 'edit_individual'}),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).
        success(function(data, status, headers, config) {
          if(data.success){
            $scope.individuals[index]['name']= item.name;
            $scope.individuals[index]['surName']= item.surName;
            $scope.individuals[index]['firstName']= item.firstName;
            $scope.individuals[index]['middleName']= item.middleName;
            $scope.individuals[index]['province']= item.province;
            $scope.individuals[index]['municipal']= item.municipal;
            $scope.individuals[index]['barangay']= item.barangay;
            $scope.individuals[index]['sex']= item.sex;
            $scope.individuals[index]['contact']= item.contact;
            $scope.individuals[index]['email']= item.email;
            $scope.selected = {};
            $mdToast.show(
                $mdToast.simple()
                .textContent('Individual Beneficiary Successfully Updated!')
                .position('bottom right')
                .hideDelay(3000)
              );
        //----           
          }else{
            alert("Required fields missing, Please enter and submit");
            console.log(data);
          }
        });
  }

  $scope.edit = function(item){
    $scope.selected = angular.copy(item);
    $scope.selected.index = $scope.individuals.indexOf(item);
    console.log($scope.selected);
  } 

  //angular material dialog did not support stack modal
  $scope.del = function(item){
    //var i = $scope.temp;
   // console.log(i);
    $("#dialog-confirm").html("These data will be permanently deleted and cannot be recovered. Are you sure?");  
    // Define the Dialog and its properties.
      $("#dialog-confirm").dialog({
          resizable: false,
          modal: true,
          title: "Delete item?",
          height: 250,
          width: 400,
          buttons: {
              "Yes": function () {  
                  $(this).dialog('close');
                  $http({
                  method: 'post',
                  url: 'ajax.php',
                  data: $.param({'id' : item.id,'type' : 'delete_individual'}),
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).
                success(function(data, status, headers, config) {
                  if(data.success){
                  //var mon = parseInt(mon)-1; //to match the index in the page
                 // inds[i.index]['total'][mon]['total']=parseInt(inds[i.index]['total'][mon]['total'])-1;
                  $scope.individuals.splice($scope.individuals.indexOf(item), 1 );
                  $mdToast.show(
                    $mdToast.simple()
                    .textContent('Individual Beneficiary Successfully Deleted!')
                    .position('bottom right')
                    .hideDelay(3000)
                  ); 
                  }
                });
          },
              "No": function () {
                  $(this).dialog('close');
              }
          }
      }); 
  };

}