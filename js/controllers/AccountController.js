'use strict';

app.controller('AccountController',  function($scope, $mdToast, $http, $timeout, Upload, EditAccountService, getAccountService){


getAccountService.async().then(function(d){
	console.log(d.data.data);
	$scope.user = {
	  firstName: d.data.data[0].first_name,
	  lastName: d.data.data[0].last_name,
	  email: d.data.data[0].email,
	  username: d.data.data[0].username,
	  pwd: d.data.data[0].password
	}
});

$scope.update_user = function(user){
 	EditAccountService.async($scope.user).then(function(d) {
 		if (d.data.success){
	 			$scope.user = {
				  firstName: user.firstName,
				  lastName: user.lastName,
				  email: user.email,
				  username: user.username
				}
				//global
				$scope.firstName =  user.firstName;
				$scope.lastName =  user.lastName;
				$scope.email =  user.email;

 				$mdToast.show(
					$mdToast.simple()
					.textContent('Profile successfuly changed!')
					.position('bottom right')
					.hideDelay(3000)
					);
 				$scope.form.$setPristine();
				$scope.form.$setUntouched();
 		}
 	})
}

$scope.change_pass = function(pwd){
	console.log(pwd);
	var promise = $http({
		method: 'post',
		url: 'ajax.php',
		data: $.param({'item' : pwd,'type' : 'changePassword'}),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).
	success(function(data, status, headers, config) {
		if(data.success){
			console.log(data);
			$scope.user.pwd = pwd.confirm;
				$mdToast.show(
					$mdToast.simple()
					.textContent('Password successfuly changed!')
					.position('bottom right')
					.hideDelay(3000)
					);		   				
		}else{
			alert("error mode - data success");
			console.log(data);
		}
	});
	$scope.password=null;
	$scope.form1.$setPristine();
	$scope.form1.$setUntouched();
}

$scope.change_avatar = function(dataUrl, name){
	console.log(dataUrl);
	console.log(name);
	console.log(Upload.dataUrltoBlob(dataUrl, name));
	Upload.upload({
        url: 'ajax.php',
        method: 'post',
        data: {
            'file': Upload.dataUrltoBlob(dataUrl, name),
            'type': 'changeAvatar',
            'targetPath': '/images/avatar/'
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
		$timeout(function(){
			console.log(response);
			$scope.result = response.data;
			$mdToast.show(
					$mdToast.simple()
					.textContent('Avatar successfuly changed!')
					.position('bottom right')
					.hideDelay(3000)
					);	
			$scope.image = response.data.filename;
			$scope.picFile = null;
			$scope.user.password2 = null;
		});
	}, function(response){
		if (response.status>0)
			$scope.errorMsg = response.status  + ': ' + response.data;
	}, function(evt){
		$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
		console.log($scope.progress);
	});


	$scope.form2.$setPristine();
	$scope.form2.$setUntouched();
}

});



