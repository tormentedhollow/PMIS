'use strict';
//mfos used to update the DOM
function MyBeneController($scope, $mdDialog, $mdToast, item, month, mfos, BeneDetailsService, BeneDelService, EditBeneService) {
	console.log(item);
	var ind = mfos.indexOf(item);
	$scope.selected={};

	BeneDetailsService.async(item, month).then(function(d){
		$scope.bene = d.data.data;
		$scope.temp = {
		mfo_name: item.mfo_name,
		description: item.description,
		area: item.area,
		ind: item.ind,	
		month: month,
		month_name: $scope.bene[0].month_name		
	};
		console.log(d.data.data);			
	});


	

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.getTemplate = function (x) {
        if (x.bene_id === $scope.selected.bene_id) return 'edit';
        else return 'display';
    };

    $scope.reset = function () {
        $scope.selected = {};
    }

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
	                BeneDelService.async(item).then(function(d) {
	                	console.log(d.data);
	     
					$scope.bene.splice($scope.bene.indexOf(item), 1 );
					var mon = parseInt(month)-1; //to match the index in the page
					if(mfos[ind].ben[mon].b!=null){
						mfos[ind].ben[mon].b = parseInt(mfos[ind].ben[mon].b) - (parseInt(item.male) + parseInt(item.female) + parseInt(item.ind));
						mfos[ind].ben[mon].g = parseInt(mfos[ind].ben[mon].g) - parseInt(item.groups);
					}
					$mdToast.show(
						$mdToast.simple()
						.textContent('Beneficiary Successfully Deleted!')
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

	$scope.edit = function(item){
  		$scope.selected = angular.copy(item);
  		$scope.selected.id = $scope.bene.indexOf(item);
  		$scope.selected.male = parseInt(item.male);
  		$scope.selected.female = parseInt(item.female);
  		$scope.selected.ind = parseInt(item.ind);
  		$scope.selected.groups = parseInt(item.groups);
  		console.log($scope.selected);
	};

	$scope.save = function(item, bene, index){
		console.log(bene);
		console.log(item);
		EditBeneService.async(item).then(function(d) {
			if(d.data.success){
				console.log(d.data);
				$scope.bene[index]['male']= item.male;
				$scope.bene[index]['female']= item.female;
				$scope.bene[index]['ind']= item.ind;
				$scope.bene[index]['groups']= item.groups;
				$scope.selected = {};
				//update the DOM
				var mon = parseInt(month)-1; //to match the index in the page
				mfos[ind].ben[mon].b = d.data.ind_total;
				mfos[ind].ben[mon].g = d.data.group_total;
				$mdToast.show(
						$mdToast.simple()
						.textContent('Beneficiary Successfully Updated!')
						.position('bottom right')
						.hideDelay(3000)
					);

			}else{
				alert("error");
			}

		});
	}
  }

