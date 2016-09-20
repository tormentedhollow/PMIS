'use strict';
app.factory('sessionService', ['$http', function($http){
	var obj = {};

	obj.set = function(key, value){
		return sessionStorage.setItem(key, value);
	}
	obj.get = function(key){
		return sessionStorage.getItem(key);
	}
	obj.destroy = function(key){
		$http({
		      method: 'post',
		      url: 'ajax.php',
		      data: $.param({'type' : 'logout' }),
		      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    });		 
		return sessionStorage.removeItem(key);
	}


	return obj; 
}])