'use strict';
angular.module('app')
	.controller('ConvocatoriaCtrl', function($scope,$http){
		var refresh=function(){
			$http.get('/apiConvocatoria').success(function(response){
				$scope.convocatorias=response;
			});
		};
		refresh();
		$scope.eliminarconvocatoria=function(id){
			
			$http.delete('/apiConvocatoria/'+id).success(function(response){
				console.log(response);
				refresh();
			});
		};
		
		$scope.lblTitle="CONVOCATORIA";	

	})
	.controller('createConvocatoriaCtrl', function($scope,$http,$location,$timeout,$state,Upload){
		$scope.lblTitle="NUEVA CONVOCATORIA";
		$scope.btnGuardar="Guardar";
		$scope.texto = 'este es el  el contenido';	
		$scope.Convocatoria={};
		var idLastConvocatoria='';
		$scope.saveEvent=function(){
			
			$http.post('/apiConvocatoria',$scope.Convocatoria).success(function(response){
				idLastConvocatoria=response._id;
				$timeout(function(){
					if ($scope.archivosEvento) {
	        			$scope.uploadFiles($scope.archivosEvento,idLastConvocatoria);
	        		
	      			}
	      			$state.go('admin.Convocatorias'); //luego de 1segundo se redirecciona 	
				},1000);
				
				
			});
			
			
		};

	    $scope.uploadFiles = function(files,id_convocatoria) {
	    	console.log(id_convocatoria);
	        $scope.files = files;
	        console.log($scope.files);
	        //$scope.errFiles = errFiles;
	        angular.forEach(files, function(file) {
	            file.upload = Upload.upload({
	                url: '/apiConvocatoria/uploads',
	                data: {event_id:id_convocatoria},
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
	.controller('updateConvocatoriaCtrl', function($scope,$http,$stateParams,$location,$timeout,$state){
		var id=$stateParams.id;
		$scope.lblTitle="ACTUALIZAR CONVOCATORIA";
		$scope.btnGuardar="Actualizar";
		$scope.btnAtras="Atras";
		$http.get('/apiConvocatoria/'+id).success(function(response){
			
			$scope.Convocatoria=response;
		});
		$scope.updateConvocatoria=function(){
			$http.put('/apiConvocatoria/'+ $scope.Convocatoria._id,$scope.Convocatoria).success(function(response){
				$timeout(function(){
					
					$state.go('admin.Convocatorias');
				},1000)
			})
		$scope.atras=function(){
			$state.go('^');
		}
		}
		
		
	})
	.controller('partialConvocatoriaCtrl', function($scope,$http,$state,$sce){
		$http.get('/apiConvocatoria').success(function(response){
				$scope.listaEventos=response;
			});
		$scope.Limit = 100;
		$scope.leerMas=function(id){
				//$state.go('/:leerMas')
		}
	})
	.controller('vistaConvocatoriaCtrl', function($scope,$http,$stateParams,$timeout,$state){
		var id=$stateParams.id;
		$scope.imagenes=[];
		$http.get('/apiConvocatoria/'+id).success(function(response){
			
			$scope.Convocatoria=response;
			$scope.imagenes=response.imagen;
			
		});
	});

