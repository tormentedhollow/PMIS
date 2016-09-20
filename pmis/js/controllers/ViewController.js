'use strict';
//mfos used to update the DOM
function ViewController($scope, $mdDialog, $mdToast, item, month, mfos, a, kiloDetailsService, ProvinceService, MunicipalService, KiloDelService, EditKiloService) {
	console.log(item);
	var ind = mfos.indexOf(item);
	$scope.selected={};

	kiloDetailsService.async(item, month, a).then(function(d){
		$scope.kilo = d.data.data;
		console.log(d.data.data);	
		$scope.temp = {
			mfo_name: item.mfo_name,
			mfo_id: item.mfo_id,
			description: item.description,
			area: item.area,
			ind: item.ind,
			month_name: $scope.kilo[0].month_name,
			a:a		
		};	
		console.log($scope.temp.a);	
	});

	ProvinceService.async().then(function(d){
		$scope.provinces = d.data.data;
	});

	MunicipalService.async().then(function(d){
		$scope.municipals = d.data.data;
	});



	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.getTemplate = function (x) {
        if (x.reg_id === $scope.selected.reg_id) return 'edit';
        else return 'display';
    };

    $scope.reset = function () {
        $scope.selected = {};
    };

//angular material dialog did not support stack modal
	$scope.del = function(item, ind){
	  $("#dialog-confirm").html("These items will be permanently deleted and cannot be recovered. Are you sure?");  
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
	           		item.a = 'true';
	           		KiloDelService.async(item).then(function(d) {
	                console.log(d.data);	            
								$scope.kilo.splice($scope.kilo.indexOf(item), 1 );
								$mdToast.show(
									$mdToast.simple()
									.textContent('Accomplishment data Successfully Deleted!')
									.position('bottom right')
									.hideDelay(3000)
								);
								//----------------------
								var mon = parseInt(month); //to match the index in the page
								if(mfos[ind].kiloa[mon].kiloa!=null){
									mfos[ind].kiloa[mon].kiloa = parseFloat(mfos[ind].kiloa[mon].kiloa)-parseFloat(item.kilo);
								}
								//---------------------				
	             });
	            },
	            "No": function () {
	                $(this).dialog('close');
	            }
	        }
	    });	
	};

	$scope.edit = function(item){
  		$scope.selected = angular.copy(item);
  		$scope.selected.id = $scope.kilo.indexOf(item);
  		$scope.selected.kilo = parseInt(item.kilo, 10);
  		$scope.selected.a = true;
  		console.log($scope.selected);
	};

	$scope.save = function(item, kilo, index){
		console.log(kilo);
		console.log(item);
		EditKiloService.async(item).then(function(d) {
			if(d.data.success){
				console.log(d.data);
				$scope.kilo[index]['province']= item.province;
				$scope.kilo[index]['municipal']= item.municipal;
				$scope.kilo[index]['kilo']= item.kilo;
				$scope.selected = {};
				$mdToast.show(
				$mdToast.simple()
				.textContent('Physical Accomplishment Successfully Updated!')
				.position('bottom right')
				.hideDelay(3000)
			);
				var mon = parseInt(month); //to match the index in the page
				if(mfos[ind].kiloa[mon].kiloa!=null){
					//alert("hee");
					mfos[ind].kiloa[mon].kiloa = parseFloat(d.data.kt);
					console.log(parseFloat(d.data.kt));
				}
			}else{
				alert("error");
			}

		});
	}
  }

 app.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    };
});