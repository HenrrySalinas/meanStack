module.exports = function(app,db,mongojs) {


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
}