var app = angular.module('myApp', ['ngMaterial', 'ngRoute', 'ui.router', 'md.data.table', 'ngCookies', 'ngMdIcons', 'googlechart', 'angular.filter', 'ngFileUpload', 'ngImgCrop', 'luegg.directives', 'angularMoment']);

app.config(function($routeProvider, $stateProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'pages/log-in.html',
		controller: 'LoginController'
	})
	.when('/pmis', {
		templateUrl : 'pages/menu-pmis.html',
		controller: 'PmisController',
	})
	.when('/admin', {
		templateUrl : 'pages/menu-admin.html',
		controller: 'AdminController',
	})
	.otherwise({redirectTo: '/'});

	$stateProvider
	.state('pmis', {        
		views: {
			"viewA": {
				templateUrl: "pages/pmis.html"
			}
		}
	})
	.state('admin', {        
		views: {
			"viewA": {
				templateUrl: "pages/admin.html"
			}
		}
	})
	.state('riceAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 1, },
	})
	.state('cornAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 2, },
	})
	.state('hvcdpAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 3, },
	})
	.state('livestockAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 4, },
	})
	.state('organicAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 5, },
	})
	.state('amadAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 14, },
	})
	.state('ildAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 19, },
	})
	.state('pmedAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 17, },
	})
	.state('raedAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 18, },
	})
	.state('regulatoryAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 16, },
	})
	.state('researchAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 15, },
	})
	.state('stn_trentoAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 11, },
	})
	.state('stn_delmonteAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 12, },
	})
	.state('stn_tagbinaAdmin', {        
		views: {
			"viewA": {
				templateUrl: "pages/adminperformance.html",
				controller: 'AdminPerformanceController',
			}
		},
		params : { id: 13, },
	})
	.state('rice', {        
		views: {
			"viewA": {
				templateUrl: "pages/rice.html",
				controller: 'RiceController',
			}
		}
	})
	.state('corn', {        
		views: {
			"viewA": {
				templateUrl: "pages/corn.html",
				controller: 'CornController',
			}
		}
	})
	.state('hvcdp', {        
		views: {
			"viewA": {
				templateUrl: "pages/hvcdp.html",
				controller: 'HVCDPController',
			}
		}
	})
	.state('livestock', {        
		views: {
			"viewA": {
				templateUrl: "pages/livestock.html",
				controller: 'LivestockController',
			}
		}
	})
	.state('organic', {        
		views: {
			"viewA": {
				templateUrl: "pages/organic.html",
				controller: 'OrganicController',
			}
		}
	})
	.state('rice2', {        
		views: {
			"viewA": {
				templateUrl: "pages/rice2.html",
				controller: 'Rice2Controller',
			}
		}
	})
	.state('corn2', {        
		views: {
			"viewA": {
				templateUrl: "pages/corn2.html",
				controller: 'Corn2Controller',
			}
		}
	})
	.state('hvcdp2', {        
		views: {
			"viewA": {
				templateUrl: "pages/hvcdp2.html",
				controller: 'HVCDP2Controller',
			}
		}
	})
	.state('livestock2', {        
		views: {
			"viewA": {
				templateUrl: "pages/livestock2.html",
				controller: 'Livestock2Controller',
			}
		}
	})
	.state('organic2', {        
		views: {
			"viewA": {
				templateUrl: "pages/organic2.html",
				controller: 'Organic2Controller',
			}
		}
	})
	.state('beds', {       	
		views: {
			"viewA": {
				templateUrl: "pages/beds.html",
				controller: 'BedsController',
			}
		}
	})
	.state('quarter', {       	
		views: {
			"viewA": {
				templateUrl: "pages/quarter.html",
				controller: 'QuarterController',
			}
		}
	})
	.state('reports', {       	
		views: {
			"viewA": {
				templateUrl: "pages/reports.html",
				controller: 'ReportsController',
			}
		}
	})
	.state('performance', {       	
		views: {
			"viewA": {
				templateUrl: "pages/performance.html",
				controller: 'PerformanceController',
			}
		}
	})
	.state('account', {       	
		views: {
			"viewA": {
				templateUrl: "pages/account.html",
				controller: 'AccountController',
			}
		}
	})
	.state('download', {       	
		views: {
			"viewA": {
				templateUrl: "pages/download.html",
				controller: 'DownloadController',
			}
		}
	})
	.state('beneficiary', {       	
		views: {
			"viewA": {
				templateUrl: "pages/beneficiary.html",
				controller: 'BeneficiaryController',
			}
		}
	});
})
.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('error-toast');
	$mdThemingProvider.theme('altTheme')
	.primaryPalette('blue');
});

app.run(function($rootScope, $location, loginService){
	var routespermission = ['/pmis', '/admin'];
	console.log(routespermission.indexOf($location.path()));
	console.log(loginService.isLogged());
	$rootScope.$on('$routeChangeStart', function(){
		if(routespermission.indexOf($location.path()) !=-1 && !loginService.isLogged())
		{		
			$location.path('/');
		} 
	});
});

app.config(function($mdIconProvider) {
    $mdIconProvider
      // linking to https://github.com/google/material-design-icons/tree/master/sprites/svg-sprite
      // 
      .iconSet('action', 'resources/svg/svg-sprite-action.svg', 24)
      .iconSet('alert', 'resources/svg/svg-sprite-alert.svg', 24)
      .iconSet('av', 'resources/svg/svg-sprite-av.svg', 24)
      .iconSet('communication', 'resources/svg/svg-sprite-communication.svg', 24)
      .iconSet('content', 'resources/svg/svg-sprite-content.svg', 24)
      .iconSet('device', 'resources/svg/svg-sprite-device.svg', 24)
      .iconSet('editor', 'resources/svg/svg-sprite-editor.svg', 24)
      .iconSet('file', 'resources/svg/svg-sprite-file.svg', 24)
      .iconSet('hardware', 'resources/svg/svg-sprite-hardware.svg', 24)
      .iconSet('image', 'resources/svg/svg-sprite-image.svg', 24)
      .iconSet('maps', 'resources/svg/svg-sprite-maps.svg', 24)
      .iconSet('navigation', 'resources/svg/svg-sprite-navigation.svg', 24)
      .iconSet('notification', 'resources/svg/svg-sprite-notification.svg', 24)
      .iconSet('social', 'resources/svg/svg-sprite-social.svg', 24)
      .iconSet('toggle', 'resources/svg/svg-sprite-toggle.svg', 24)
    
      // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
      // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
      .iconSet('avatars', 'resources/svg/avatar-icons.svg', 24)
      .defaultIconSet('resources/svg/svg-sprite-action.svg', 24);
});

app.factory('Excel',function($window){
        var uri='data:application/vnd.ms-excel;base64,',
            template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
            format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
        return {
            tableToExcel:function(tableId,worksheetName){
                var table=$(tableId),
                    ctx={worksheet:worksheetName,table:table.html()},
                    href=uri+base64(format(template,ctx));
                return href;
            }
        };
    });


