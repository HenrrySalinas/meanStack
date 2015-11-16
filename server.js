var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('meandb',['eventos','multimedia']);
var bodyParser=require('body-parser');
/*begin libs para carga de archivos*/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
eventsController = require('./controllers/eventosControllerServer');
/*end libs para carga de archivos*/

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());


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
app.listen(3000);
console.log('server runing ... port 3000');
