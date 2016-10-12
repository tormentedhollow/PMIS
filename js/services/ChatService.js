'use strict';

app.factory('ChatService',  ['$http', function($http) {

    var promise;
    var ChatService = {
        async: function(){   
            if(!promise || promise){
                promise = $http({
                    method: 'post',
                    url: 'ajax.php',
                    data: $.param({ 'type' : 'getChatMessage' }),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response) {
                        console.log(response.data);
                        return response.data;                                   
                });
            }
        return promise;
        }   
    };
    ;return ChatService;

}]);