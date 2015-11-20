module.exports = function(app,db,mongojs) {
 
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

					}
				},new:true},function(err,doc){
				res.json(doc);
				}
		);
	});
}