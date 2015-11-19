module.exports = function(app,db,mongojs) {
 
	app.get('/apiGallery',function(req,res){
		console.log("solicitud get hecha")
		db.multimedia.find(function (err, docs) {
			console.log(docs);
			res.json(docs);   
		});
	});

	app.delete('/apiGallery/:id',function(req,res){
		var id=req.params.id;
		db.multimedia.remove({_id:mongojs.ObjectId(id)},function(err,doc){
			res.json(doc);
		});
	});

	app.get('/apiGallery/:id',function(req,res){
		var id=req.params.id;
		
		db.multimedia.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
			res.json(doc);
		});
	});

}