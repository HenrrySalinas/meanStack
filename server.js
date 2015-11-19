var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('meandb',['eventos','multimedia','LisNoticia']);
var bodyParser=require('body-parser');

var logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy;

/***************************begin libs para carga de archivos*********************/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
eventsController = require('./controllers/eventosControllerServer');
/***************************end libs para carga de archivos*********************/

/*******************************************************************************/
/*************** FHer Login command lines *************************************/
// user schema/model
var User = require('./server/models/user.js');

// create instance of express
var app = express();

// require routes
var routes = require('./server/routes/api.js');

// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/user/', routes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});


// error hndlers
app.use(function(req, res, next) {
    var err = new Error('No fue encontrado!!');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;

/******-------************-----Fin Fher command lines---------********----------/
/*******************************************************************************/
app.use(express.static(__dirname+'/public'));
app.use("/uploads", express.static(__dirname + '/uploads'));
app.use(bodyParser.json());

/**************************begin eventos section********************************/
var eventRoutes = require('./routes/eventService')(app,db,mongojs);

app.post('/apiEvents/uploads', multipartMiddleware, eventsController.uploadFile);

/**************************end eventos section*********************************/
/***************************begin noticias section******************************/

app.get('/api/NoticiaList', function(req,res){
console.log("Resivido el metodo de Mostrar")

db.LisNoticia.find(function (err,docs){
    console.log(docs);
    res.json(docs);
});
});

app.post('/api/NoticiaList',function(req,res){
    console.log(req.body);
    db.LisNoticia.insert(req.body,function(err,doc){
        res.json(doc);
})
});

app.delete('/api/NoticiaList/:id',function(req,res){
    var id= req.params.id;
    console.log(id);
    db.LisNoticia.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
});

}),
    

app.get('/api/NoticiaList/:id',function(req,res){
var id= req.params.id;
console.log(id);
db.LisNoticia.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
    res.json(doc);
});
});


app.put('/api/NoticiaList/:id',function(req,res){
var id= req.params.id;
    console.log(req.body.nombre);
    db.LisNoticia.findAndModify({query:{_id:mongojs.ObjectId(id)}, update:{$set:{Titulo:req.body.Titulo,Fecha:req.body.Fecha,Autor:req.body.Autor, Contenido:req.body.Contenido}}, new: true},function(err,doc){
        res.json(doc);
    
    });
                                  
})

/***************************end noticias section********************************/

/**************************begin gallery section********************************/
var galleryRoutes = require('./routes/galleryService')(app,db,mongojs);

/**************************end gallery section*********************************/
app.listen(3000);
console.log('server runing ... port 3000');
