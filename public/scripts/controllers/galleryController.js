'use strict';
angular.module('app')
	.controller('galleryCtrl', function($scope,$http){
		$scope.imagenes=[]
		console.log('controlador de galeria admin');
		var refresh=function(){
			$http.get('/apiGallery').success(function(response){
				console.log(response);
				$scope.imagenes=response;
			});
		};
		refresh();
		$scope.eliminarImagen=function(id){
			
			$http.delete('/apiGallery/'+id).success(function(response){
				refresh();
			});
		};
		

		$scope.lblTitle="GALERIA DE IMAGENES";
	});