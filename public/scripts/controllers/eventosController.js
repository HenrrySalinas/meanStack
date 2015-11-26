'use strict';
angular.module('app')
	.controller('eventCtrl', function($scope,$http){
		var refresh=function(){
			$http.get('/apiEvents').success(function(response){
				$scope.events=response;
			});
		};
		refresh();
		$scope.eliminarEvento=function(id){
			
			$http.delete('/apiEvents/'+id).success(function(response){
				refresh();
			});
		};
		
		$scope.lblTitle="EVENTOS";	

	})
	.controller('createEventCtrl', function($scope,$http,$location,$timeout,$state,Upload){
		$scope.lblTitle="NUEVO EVENTO";
		$scope.btnGuardar="Guardar";
		$scope.texto = 'este es el  el contenido';	
		$scope.Evento={};
		var idLastEvent='';
		$scope.saveEvent=function(){
			
			$http.post('/apiEvents',$scope.Evento).success(function(response){
				idLastEvent=response._id;
				$timeout(function(){
					if ($scope.archivosEvento) {
	        			$scope.uploadFiles($scope.archivosEvento,idLastEvent);
	        		
	      			}
	      			$state.go('admin.events'); //luego de 1segundo se redirecciona 	
				},1000);
				
				
			});
			
			
		};

	    $scope.uploadFiles = function(files,id_event) {
	    	console.log(id_event);
	        $scope.files = files;
	        console.log($scope.files);
	        //$scope.errFiles = errFiles;
	        angular.forEach(files, function(file) {
	            file.upload = Upload.upload({
	                url: '/apiEvents/uploads',
	                data: {event_id:id_event},
	                file:file
	            });

	            file.upload.then(function (response) {
	                $timeout(function () {
	                    file.result = response.data;
	                    console.log(response);
	                });
	            }, function (response) {
	                if (response.status > 0)
	                    $scope.errorMsg = response.status + ': ' + response.data;
	            }, function (evt) {
	                file.progress = Math.min(100, parseInt(100.0 * 
	                                         evt.loaded / evt.total));
	                
	            });
	        });
    	};
    	$scope.quitarImagen = function(index) {
        	$scope.archivosEvento.splice(index,1);//para eliminar un eliminarEventoento de un array
        	
      	}
	})
	.controller('updateEventCtrl', function($scope,$http,$stateParams,$timeout,$state){
		var id=$stateParams.id;
		$scope.lblTitle="ACTUALIZAR EVENTO";
		$scope.btnGuardar="Actualizar";
		$scope.btnAtras="Atras";
		$scope.imagenes=[];
		var refreshUpdate=function(){
			$scope.imagenes=[];
			$http.get('/apiEvents/'+id).success(function(response){
				//console.log(response);
				$scope.Evento=response;
				angular.forEach(response.imagen, function(value, key) {
				      	
		        	$scope.imagenes.push(value);
		        });
			});
		}
		refreshUpdate();
		$scope.updateEvent=function(){
			$http.put('/apiEvents/'+ $scope.Evento._id,$scope.Evento).success(function(response){
				$timeout(function(){
					//$location.path('/events');
					$state.go('admin.events');
				},1000)
			});
		
		}
		$scope.atras=function(){
			$state.go('^');
		}
		$scope.eliminarImagen = function(id_imagen,par_directorio) {
			var eventToDelete={
				_id:$scope.Evento._id,
				directorio:par_directorio

			}
        	
        	$http.put('/apiEventsGallery/'+ id_imagen,eventToDelete).success(function(response){
				/*$timeout(function(){
					//$location.path('/events');
					$state.go('admin.events');
				},1000)*/
        		
			});
        	refreshUpdate();
      	}
	})
	.controller('partialEventoCtrl', function($scope,$http,$state,$sce){
		$http.get('/apiEvents').success(function(response){
				$scope.listaEventos=response;
				console.log(response);
			});
		$scope.Limit = 100;
		$scope.leerMas=function(id){
				//$state.go('/:leerMas')
		}
	})
	.controller('vistaEventoCtrl', function($scope,$http,$stateParams,$timeout,$state){
		var id=$stateParams.id;
		$scope.imagenes=[];

		$http.get('/apiEvents/'+id).success(function(response){
			
			$scope.Evento=response;
			$scope.imagenes=response.imagen;
			
		});
	});

