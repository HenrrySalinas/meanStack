var fs = require('fs');
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
	
	app.put('/apiEventsGallery/:id',function(req,res){
		var id_imagen=req.params.id;
		var id=req.body._id;
		var directorio=req.body.directorio;
		
		db.eventos.update({_id:mongojs.ObjectId(id)},
				{
					$pull:
					{
						"imagen":
						{
							"_id":mongojs.ObjectId(id_imagen)
						}
										}
				}
				,function(err,doc){
					console.log(doc)
					res.json(doc);
				}
		);
		fs.unlink('./'+directorio, function (err) {
		  if (err) throw err;
		  //console.log('successfully deleted');
		});
	});
}