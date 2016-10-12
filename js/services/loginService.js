'use strict';

app.factory('loginService', function($http, $location, $state, $cookies, sessionService) {
	var promise;
	var loginService = {
		async: function(user, pwd){	
			if(!promise || promise){
				promise = $http({
					method: 'post',
					url: 'ajax.php',
					data: $.param({'username' : user, 'password' : pwd, 'type' : 'log_in' }),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).
				success(function(data, status, headers, config) {
					console.log(data);
					if(data.success){
						if(data.uid && data.program_id=='6'){
							sessionService.set('uid', data.uid);
							 $location.path('/admin');
	     					 $state.transitionTo('admin');
	     					 $cookies.put('firstName', data.first_name);
	     					 $cookies.put('lastName', data.last_name);
	     					 $cookies.put('email', data.email); 
	     					 $cookies.put('username', data.username); 
	     					 $cookies.put('image', data.image);
	     					 $cookies.put('password', data.password);
	     					 $cookies.put('image', data.image);
							return data.data;    				
						}else{
							sessionService.set('uid', data.uid);
							 $location.path('/pmis');
	     					 $state.transitionTo('pmis'); 
	     					 $cookies.put('firstName', data.first_name);
	     					 $cookies.put('lastName', data.last_name);
	     					 $cookies.put('email', data.email);
	     					 $cookies.put('username', data.username);
	     					 $cookies.put('program_id', data.program_id);  
	     					 $cookies.put('image', data.image);
	     					 $cookies.put('password', data.password);
	     					 $cookies.put('image', data.image);
							return data.data;  	
						}
					}
					
				});
			}
			return promise;
		},
		logout: function(){
			sessionService.destroy('uid');
			$location.path('/') 
		},

		isLogged: function(){
			if(sessionService.get('uid')) return true;
			
			/*var $checkSessionServer = $http({
		      method: 'post',
		      url: 'ajax.php',
		      data: $.param({'type' : 'check_session' }),
		      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).then(function(response) {
				console.log(response.data);
				return response.data;    								
			});	
		   
		    */
		}	
	};
	return loginService;
});