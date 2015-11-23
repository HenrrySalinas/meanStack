'use strict';
angular.module('app')
.controller('envCorreo',function($scope){

$scope.Enviar = function()
{
	console.log($scope.contacto);
}
})