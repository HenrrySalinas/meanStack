'use strict';
angular.module('app')
	.controller('galleryEventCtrl', function($scope,$http){
		$scope.imagenes=[];
		console.log('controlador de galeria admin');
		var refresh=function(){
			$http.get('/apiEvents').success(function(response){
				
				angular.forEach(response, function(value, key) {
					
			        angular.forEach(value.imagen, function(value, key) {
			        	
			        	$scope.imagenes.push(value);
			        });
			        
			    });
				
			});
		};
		refresh();

		$scope.getImages=function(){
			return $scope.imagenes;
		}
		$scope.eliminarImagen=function(id,Evento){

		};
		

		$scope.lblTitle="IMAGENES DE EVENTOS";
	});