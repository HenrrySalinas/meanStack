'use strict';
angular.module('app')
	.controller('galleryCtrl', function($scope,$http){
		console.log('controlador de galeria admin');
		var refresh=function(){
			$http.get('/apiGallery').success(function(response){
				//console.log(response);
				$scope.imagenes=response;
			});
		};
		refresh();
		$scope.eliminarImagen=function(id){
			
			$http.delete('/apiGallery/'+id).success(function(response){
				refresh();
			});
		};
		console.log($scope.imagenes);
		$scope.lblTitle="GALERIA DE IMAGENES";
	});