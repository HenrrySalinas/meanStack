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
					if ($scope.archivosConvocatoria) {
	        			$scope.uploadFiles($scope.archivosConvocatoria,idLastConvocatoria);
	        		
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
	                data: {convocatoria_id:id_convocatoria},
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
        	$scope.archivosConvocatoria.splice(index,1);//para eliminar un eliminarEventoento de un array
        	
      	}
      	$scope.isImage=function(url){
		   	var arr = [ "jpeg", "jpg", "gif", "png" ];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
			for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};

		}
		$scope.isOffice=function(url){
			var arr=["xlsx","xls","docx","doc","pptx","ppt"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};
		}
		$scope.getTypeOffice=function(url){
			var dir="images/office/";
			var arr=["xlsx","xls","docx","doc","pptx","ppt","pdf","zip","rar"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			dir=dir+arr[i]+'.png';
		   		}
		   	};
		   	if (dir=="images/office/") {
		   		dir=dir+'unknow.png';
		   	};
		   	return dir;
		}
		$scope.isVideo=function(url){
		   	var arr = [ "mp4", "flv", "3gp", "wmv" ];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
			for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}
		   	};
		}
		$scope.isCompress=function(url){
			var arr=["rar","zip","tar"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};
		}
		$scope.isPdf=function(url){
		   	var ext = url.substring(url.lastIndexOf(".")+1);
	   		if(ext=="pdf"){
	   			return true;
	   		}
		}
	})
	.controller('updateConvocatoriaCtrl', function($scope,$http,$stateParams,$location,$timeout,$state,Upload){
		var id=$stateParams.id;
		$scope.lblTitle="ACTUALIZAR CONVOCATORIA";
		$scope.btnGuardar="Actualizar";
		$scope.btnAtras="Atras";
		$scope.imagenes=[];
		var refreshUpdate=function(){
			$scope.imagenes=[];
			$http.get('/apiConvocatoria/'+id).success(function(response){
			
			$scope.Convocatoria=response;
			angular.forEach(response.imagen, function(value, key) {
				      	
		        	$scope.imagenes.push(value);
		        });
			});
		};
		refreshUpdate();
		$scope.updateConvocatoria=function(){
			$http.put('/apiConvocatoria/'+ $scope.Convocatoria._id,$scope.Convocatoria).success(function(response){
				$timeout(function(){
					if ($scope.archivosConvocatoria) {
	        			$scope.uploadFiles($scope.archivosConvocatoria,$scope.Convocatoria._id);
	        		
	      			}
					$state.go('admin.Convocatorias');
				},1000)
			})
	
		}
		$scope.atras=function(){
			$state.go('^');
		}
		$scope.eliminarImagen = function(id_imagen,par_directorio) {
			var convocatoriaToDelete={
				_id:$scope.Convocatoria._id,
				directorio:par_directorio

			}
        	$http.put('/apiConvocatoriaGallery/'+ id_imagen,convocatoriaToDelete).success(function(response){
				console.log('eliminado!');
        		
			});
        	refreshUpdate();
      	}

      	$scope.quitarImagen = function(index) {
        	$scope.archivosConvocatoria.splice(index,1);
        	
      	}
      	$scope.uploadFiles = function(files,id_convocatoria) {
	    	console.log(id_convocatoria);
	        $scope.files = files;
	        console.log($scope.files);
	        //$scope.errFiles = errFiles;
	        angular.forEach(files, function(file) {
	            file.upload = Upload.upload({
	                url: '/apiConvocatoria/uploads',
	                data: {convocatoria_id:id_convocatoria},
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
    	$scope.isImage=function(url){
		   	var arr = [ "jpeg", "jpg", "gif", "png" ];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
			for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};

		}
		$scope.isOffice=function(url){
			var arr=["xlsx","xls","docx","doc","pptx","ppt"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};
		}
		$scope.getTypeOffice=function(url){
			var dir="images/office/";
			var arr=["xlsx","xls","docx","doc","pptx","ppt","pdf","zip","rar"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			dir=dir+arr[i]+'.png';
		   		}
		   	};
		   	if (dir=="images/office/") {
		   		dir=dir+'unknow.png';
		   	};
		   	return dir;
		}
		$scope.isVideo=function(url){
		   	var arr = [ "mp4", "flv", "3gp", "wmv" ];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
			for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}
		   	};
		}
		$scope.isCompress=function(url){
			var arr=["rar","zip","tar"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};
		}
		$scope.isPdf=function(url){
		   	var ext = url.substring(url.lastIndexOf(".")+1);
	   		if(ext=="pdf"){
	   			return true;
	   		}
		}		
		
	})
	.controller('partialConvocatoriaCtrl', function($scope,$http,$state,$sce){
		$http.get('/apiConvocatoria').success(function(response){
				$scope.listaConvocatorias=response;
			});
		$scope.Limit = 100;
		$scope.leerMas=function(id){
				//$state.go('/:leerMas')
		}
		$scope.isImage=function(url){
		   	var arr = [ "jpeg", "jpg", "gif", "png" ];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
			for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};

		}
		$scope.isOffice=function(url){
			var arr=["xlsx","xls","docx","doc","pptx","ppt"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};
		}
		$scope.getTypeOffice=function(url){
			var dir="images/office/";
			var arr=["xlsx","xls","docx","doc","pptx","ppt","pdf","zip","rar"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			dir=dir+arr[i]+'.png';
		   		}
		   	};
		   	if (dir=="images/office/") {
		   		dir=dir+'unknow.png';
		   	};
		   	return dir;
		}
		$scope.isVideo=function(url){
		   	var arr = [ "mp4", "flv", "3gp", "wmv" ];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
			for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}
		   	};
		}
		$scope.isCompress=function(url){
			var arr=["rar","zip","tar"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};
		}
		$scope.isPdf=function(url){
		   	var ext = url.substring(url.lastIndexOf(".")+1);
	   		if(ext=="pdf"){
	   			return true;
	   		}
		}
	})

	.controller('vistaConvocatoriaCtrl', function($scope,$http,$stateParams,$timeout,$state){
		var id=$stateParams.id;
		$scope.imagenes=[];

		$http.get('/apiConvocatoria/'+id).success(function(response){
			console.log(response);
			$scope.Convocatoria=response;
			$scope.imagenes=response.imagen;
			
		});
		$scope.isImage=function(url){
		   	var arr = [ "jpeg", "jpg", "gif", "png" ];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
			for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};

		}
		$scope.isOffice=function(url){
			var arr=["xlsx","xls","docx","doc","pptx","ppt"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};
		}
		$scope.getTypeOffice=function(url){
			var dir="images/office/";
			var arr=["xlsx","xls","docx","doc","pptx","ppt","pdf","zip","rar"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			dir=dir+arr[i]+'.png';
		   		}
		   	};
		   	if (dir=="images/office/") {
		   		dir=dir+'unknow.png';
		   	};
		   	return dir;
		}
		$scope.isVideo=function(url){
		   	var arr = [ "mp4", "flv", "3gp", "wmv" ];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
			for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}
		   	};
		}
		$scope.isCompress=function(url){
			var arr=["rar","zip","tar"];
		   	var ext = url.substring(url.lastIndexOf(".")+1);
		   	for (var i = 0; i < arr.length; i++) {
		   		if(ext==arr[i]){
		   			return true;
		   		}

		   	};
		}
		$scope.isPdf=function(url){
		   	var ext = url.substring(url.lastIndexOf(".")+1);
	   		if(ext=="pdf"){
	   			return true;
	   		}
		}
		
	});

