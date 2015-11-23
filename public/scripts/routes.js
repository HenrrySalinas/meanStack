'use strict'
angular.module('app', ['ngResource','ui.router','ngSanitize','ngFileUpload','ngTouch','ngAnimate'])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('home');

        $urlRouterProvider.when('', '/home');
		$stateProvider

			.state('home', {
            	url: '/home',
                views: {
                    'header' : { templateUrl: 'views/home/headerHome.html' },
                    'content': { 
                        templateUrl: 'views/home/partial-home.html',
                        controller:'homeCtrl' 
                    },
                    'footer' : { templateUrl: 'views/home/footerHome.html' }
                }
                
        	})
            .state('admin',{
                url:'^/admin',
                views: {
                    'header' : {  },
                    'content': { 
                        templateUrl: 'admin/index.html',
                        controller:'adminCtrl' 
                    },
                    'footer' : {  }
                }
            })
            .state('home.404',{
                //url:'/404',
                //url: '{path:.*}',
                templateUrl:'views/home/404.html'

            })
            /*******************BEGIN LOGIN********************************/
            .state('login',{
                url:'^/login',
                views:{
                    'header':{},
                    'content':{
                        templateUrl:'views/login/index.html',
                        controller:'loginCtrl'
                    },
                    'footer':{}
                }
            })
            /*******************BEGIN LOGIN********************************/
            /*******************BEGIN EVENTS STATES************************/
        	.state('admin.events',{
        		url:'/events',
        		templateUrl:'views/events/index.html',
        		controller: 'eventCtrl',
            	caseInsensitiveMatch:true,
            	//authenticate: true
        	})
        	.state('admin.eventsCreate',{
        		url:'/events/create',
        		templateUrl:'views/events/create.html',
				controller:'createEventCtrl'
        	})
        	.state('admin.eventsUpdate',{
        		url:'/events/update/:id',
        		templateUrl:'views/events/edit.html',
				controller:'updateEventCtrl'
        	})
            .state('home.partialEvents',{
                url:'/eventos',
                templateUrl:'views/events/paginas/evento.html',
                controller:'partialEventoCtrl'
            })
            .state('home.event',{
                url:'/evento/:id',
                templateUrl:'views/events/paginas/A_event.html',
                controller:'vistaEventoCtrl'
            })
            /********************END EVENTS STATES**************************/
           /********************BEGIN NOTICIAS STATES***********************/
           .state('admin.noticia',{
                url:'/notias',
                templateUrl:'views/noticias/create.html',
                controller:'Control'
            })
            .state('home.mostrarnoticia',{
                url:'/noticias',
                templateUrl: 'views/noticias/Noticia.html',
                controller:'VNoticia'
            })
            /********************END   NOTICIAS STATES***********************/
             /********************VIEW NOTICIAS****************///function
           .state('home.verNoticia',{
                url:'/vernoticia/:id',
                templateUrl:'views/noticias/VerNoticia.html',
                controller:'VerMasNoticia'
            })
           //*******************END VIEW NOTICIAS*************//
            /********************BEGIN CONTACTOS STATES***********************/
        
            .state('home.mostrarcontactos',{
                url:'/contactos',
                templateUrl: 'views/contactos/Contacto.html',
                //controller:'VNoticia'
            })
        
            /********************END   CONTACTOS STATES***********************/
            /********************BEGIN CONVOCATORIAS***********************/
           .state('admin.convocatorias',{
                url:'/convocatorias',
                templateUrl:'views/convocatorias/index.html',
                //controller:'Control'
            })
            
            /********************END CONVOCATORIAS STATES***********************/
            /********************BEGIN GALERIA***********************/
            .state('admin.ImageEvents',{
                url:'/galeria',
                templateUrl:'views/galeria/galeria-eventos.html',
                controller:'galleryEventCtrl'
            });
            /********************END Galeria***********************/
	});

angular.module('app').directive('ckEditor', [function () {

        return {
            require: '?ngModel',
            restrict: 'C',
            link: function (scope, elm, attr, model) {
                var isReady = false;
                var data = [];

                var ck = CKEDITOR.replace(elm[0],{
                    filebrowserBrowseUrl: '/',
                    filebrowserUploadUrl: '/'
                });
                
                function setData() {
                    if (!data.length) { return; }

                    var d = data.splice(0, 1);
                    ck.setData(d[0] || '<span></span>', function () {
                        setData();
                        isReady = true;
                    });
                }

                ck.on('instanceReady', function (e) {
                    if (model) { setData(); }
                });

                elm.bind('$destroy', function () {
                    ck.destroy(false);
                });

                if (model) {
                    ck.on('change', function () {
                        scope.$apply(function () {
                            var data = ck.getData();
                            if (data == '<span></span>') {
                                data = null;
                            }
                            model.$setViewValue(data);
                        });
                    });

                    model.$render = function (value) {
                        if (model.$viewValue === undefined) {
                            model.$setViewValue(null);
                            model.$viewValue = null;
                        }

                        data.push(model.$viewValue);

                        if (isReady) {
                            isReady = false;
                            setData();
                        }
                    };
                }

            }
        };
    
    }]);
