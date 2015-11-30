ConvocatoriaController = function() {};
var fs = require('fs');
util = require('util');
var mongojs=require('mongojs');
var db=mongojs('meandb',['convocatoria','multimedia']);
ConvocatoriaController.prototype.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to 
    // the multiparty middleware
    var file = req.files.file;
    //console.log(file.name);
    //console.log(file.type); 
    //console.log(file.path);
    var extencion=file.name.split('.').pop();
    file.name=new Date().getTime();
    var newName='convocatoria_'+file.name+'.'+extencion;

    var tmp_path = file.path;
    var carpeta='./uploads/convocatoriaFiles/';

    if (!fs.existsSync(carpeta)){
        fs.mkdirSync(carpeta);
    }

    var target_path = carpeta + newName;
    var archivo='uploads/convocatoriaFiles/'+newName;
	var source = fs.createReadStream(tmp_path)
	var target = fs.createWriteStream(target_path);
    
    var documento={
        _id:mongojs.ObjectId(),
        directorio:archivo
    }
    source.pipe(target);
    source.on('end', function() { 
        db.convocatoria.findAndModify({query:{_id:mongojs.ObjectId(req.body.convocatoria_id)},
            update:{
                $push:{
                    imagen:documento
                    }
                },new:true},function(err,doc){
                    res.json(doc);
                }
        );
    });
    source.on('error', function(err) { console.error(err.stack)});

}

module.exports = new ConvocatoriaController();