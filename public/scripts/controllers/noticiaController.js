'use strict';
angular.module('app')
.controller("Control", function($scope,$http,$state){
console.log("Hola a mi controlador")

var actualizar= function(){
$http.get('/api/NoticiaList').success(function(response){
    console.log("El dato 2 tiene respuesta")
    $scope.ListNoticia = response;
    $scope.noticia={};
    $state.go('admin.noticia');
});
};

actualizar();
$scope.AddNoticia=function(){
console.log($scope.noticia);
    $http.post('/api/NoticiaList', $scope.noticia).success(function(response){
    console.log(response);
    actualizar();
    //window.location.reload();
    
    });
};
    
$scope.Eliminar= function(id){
console.log(id);
    $http.delete('/api/NoticiaList/'+id).success(function(response){
        actualizar();
});  
};

$scope.editar = function(id){
    console.log(id);
    $http.get('/api/NoticiaList/'+id).success(function(response){
$scope.noticia= response; 
$scope.AddNoticias=true;
$scope.Actual=true;   
});
};
    
$scope.Actualizar= function(){
console.log($scope.noticia._id);
    $http.put('/api/NoticiaList/'+$scope.noticia._id,$scope.noticia).success(function(response){
    actualizar();
    })

};
})

.controller("VNoticia", function($scope,$http){

var actualizar= function(){
$http.get('/api/NoticiaList').success(function(response){
    $scope.ListNoticia = response;
});
};
actualizar();
})
.controller('VerMasNoticia', function($scope,$http,$stateParams,$location,$timeout,$state){
        var id=$stateParams.id;
        console.log("Hola");
        $http.get('/api/NoticiaList/'+id).success(function(response){
               console.log(response);
$scope.Noticia= response;   
});
    });