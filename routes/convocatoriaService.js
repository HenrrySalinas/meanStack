module.exports = function(app,db,mongojs) {
 
	app.get('/apiConvocatoria',function(req,res){
		db.convocatoria.find(function (err, docs) {
			res.json(docs);   
		});
	});
	app.post('/apiConvocatoria',function(req,res){
		
		db.convocatoria.insert(req.body,function(err,doc){
			res.json(doc);
		});
	});
	app.delete('/apiConvocatoria/:id',function(req,res){
		var id=req.params.id;
		db.convocatoria.remove({_id:mongojs.ObjectId(id)},function(err,doc){
			res.json(doc);
		});
	});
	app.get('/apiConvocatoria/:id',function(req,res){
		var id=req.params.id;
		
		db.convocatoria.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
			res.json(doc);
		});
	});
	app.put('/apiConvocatoria/:id',function(req,res){
		var id=req.params.id;
		db.convocatoria.findAndModify({query:{_id:mongojs.ObjectId(id)},
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