'use strict';

app.factory('EditGroupService',  ['$http', function($http) {

  var promise;
  var EditGroupService = {
    async: function(item){   
      console.log(item);
      if(!promise || promise){
        promise = $http({
          method: 'post',
          url: 'ajax.php',
          data: $.param({'item' : item,'type' : 'edit_group'}),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).
        success(function(data, status, headers, config) {
          if(data.success){
            console.log(data);
            return data.data;           
          }else{
            alert("error mode - data success");
            console.log(data);
          }
        });
      }
    return promise;
    } 
  };
  ;return EditGroupService;

}]);