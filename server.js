var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('meandb',['eventos','multimedia','LisNoticia','convocatoria']);
var bodyParser=require('body-parser');


/***************************begin libs para carga de archivos*********************/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
eventsController = require('./controllers/eventosControllerServer');
/***************************end libs para carga de archivos*********************/

app.use(express.static(__dirname+'/public'));
app.use("/uploads", express.static(__dirname + '/uploads'));
app.use(bodyParser.json());

/**************************begin eventos section********************************/
var eventRoutes = require('./routes/eventService')(app,db,mongojs);

app.post('/apiEvents/uploads', multipartMiddleware, eventsController.uploadFile);

/**************************end eventos section*********************************/
/***************************begin noticias section******************************/

var noticiaRoutes= require('./routes/noticiaService')(app,db,mongojs);
/***************************end noticias section********************************/


/**************************begin convocatoria section********************************/
var galleryRoutes = require('./routes/convocatoriaService')(app,db,mongojs);

/**************************end convocatoria section*********************************/
/**************************begin convocatoria section********************************/
var contactoService= require('./routes/contactoService')(app,db,mongojs);

/**************************end convocatoria section*********************************/

app.listen(3000);
console.log('server runing ... port 3000');
