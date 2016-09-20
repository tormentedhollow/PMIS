'use strict';

function AddBreakdownController($scope, $mdDialog, $mdToast, item, mfos, a, MonthService, ProvinceService, MunicipalService, AddKiloService) {
	console.log(item);

	MonthService.async().then(function(d){
		$scope.months = d.data.data;			
	});

	ProvinceService.async().then(function(d){
		$scope.provinces = d.data.data;
	});

	MunicipalService.async().then(function(d){
		$scope.municipals = d.data.data;
	});
	

	$scope.temp = {
		mfo_name: item.mfo_name,
		unit: item.unitofmeasure,
		description: item.description,
		mfo_id: item.mfo_id,
		index: item.ind,
		month: null,
		provs: null,
		muns: null,
		a: a
	};
	console.log($scope.temp);

	$scope.save = function() {
		console.log($scope.temp);
		AddKiloService.async($scope.temp).then(function(d) {			
			if (d.data.success){
				console.log(d.data);
				var mon = parseInt(d.data.month)-1; //to match the index in the page
				
				if($scope.temp.month==13){//allmonth is true
					for (var m = 0; m <12; m++) { 
						//console.log(m);
						mfos[d.data.index].kilo[m].kt = d.data['kiloadded'];
						mfos[d.data.index].fin[m].ft = d.data['finadded'];
					}				
				}
				else{//----------------------
					if(mfos[d.data.index].kilo[mon].kt!=null){
						mfos[d.data.index].kilo[mon].kt = parseFloat(mfos[d.data.index].kilo[mon].kt)+parseFloat(d.data['kiloadded']);
						mfos[d.data.index].fin[mon].ft = parseFloat(mfos[d.data.index].fin[mon].ft)+parseFloat(d.data['finadded']);
					}
					else{
						mfos[d.data.index].kilo[mon].kt = d.data['kiloadded'];
						mfos[d.data.index].fin[mon].ft = d.data['finadded'];
					}
				}
				//---------------------

				$mdDialog.hide();
				$mdToast.show(
					$mdToast.simple()
					.textContent('Breakdown Successfully Added!')
					.position('bottom right')
					.hideDelay(3000)
					);
			}
		});
	};

	$scope.save2 = function() {
		AddKiloService.async($scope.temp).then(function(d) {			
			if (d.data.success){
			console.log(d.data);
				var mon = parseInt(d.data.month); 
		
				//----------------------
				if(mfos[d.data.index].kiloa[mon].kiloa!=null){
					mfos[d.data.index].kiloa[mon].kiloa = parseFloat(mfos[d.data.index].kiloa[mon].kiloa)+parseFloat(d.data['kiloadded']);
				}
				else{
					mfos[d.data.index].kiloa[mon].kiloa = d.data['kiloadded'];
				}
				//---------------------

				$mdDialog.hide();
				$mdToast.show(
					$mdToast.simple()
					.textContent('Accomplishment Successfully Added!')
					.position('bottom right')
					.hideDelay(3000)
					);
				
			}
		});
	};

	$scope.cancel = function() {
		$mdDialog.cancel();
	};


  }