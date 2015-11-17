'use strict';
angular.module('app')
	.controller('homeCtrl', function($scope,$http){

		console.log('controlador Home');
	})
	.controller('adminCtrl', function($scope,$http){

		console.log('controlador admin');
	})
	.controller('loginCtrl', function($scope,$state){
		$scope.login=function(){
			$state.go('admin');
		}
	})
	;
