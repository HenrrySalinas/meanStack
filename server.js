var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('meandb',['eventos','multimedia','LisNoticia']);
var bodyParser=require('body-parser');
/***************************begin libs para carga de archivos*********************/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
eventsController = require('./controllers/eventosControllerServer');
/***************************end libs para carga de archivos*********************/

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

/**************************begin eventos section********************************/
//var routes = require('./routes')(app);
app.post('/apiEvents/uploads', multipartMiddleware, eventsController.uploadFile);

app.get('/apiEvents',function(req,res){
	db.eventos.find(function (err, docs) {
		res.json(docs);   
	});
});
app.post('/apiEvents',function(req,res){
	
	db.eventos.insert(req.body,function(err,doc){
		res.json(doc);
	});
});
app.delete('/apiEvents/:id',function(req,res){
	var id=req.params.id;
	db.eventos.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});
app.get('/apiEvents/:id',function(req,res){
	var id=req.params.id;
	
	db.eventos.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});
app.put('/apiEvents/:id',function(req,res){
	var id=req.params.id;
	db.eventos.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update:{
			$set:{
				titulo:req.body.titulo,
				fecha:req.body.fecha,
				descripcion:req.body.descripcion

			}},new:true},function(err,doc){
			res.json(doc);
		});
});
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
    db.LisNoticia.findAndModify({query:{_id:mongojs.ObjectId(id)}, update:{$set:{Titulo:req.body.Titulo,Fecha:req.body.Fecha, Contenido:req.body.Contenido}}, new: true},function(err,doc){
        res.json(doc);
    
    });
                                  
})

/***************************end noticias section********************************/
app.listen(3000);
console.log('server runing ... port 3000');
