var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require("fs");
var path = require('path');
const cors = require('cors')

//          (_    ,_,    _) 
//          / `'--) (--'` \
//         /  _,-'\_/'-,_  \
//        /.-'     "     '-.\
//         Julia Orion Smith
const port = 1175; 
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/sitio'));

app.post("/menu", function(req,res){
	name=req.body["name"];
	console.log("parsing",name)
	livemenu={};
	if (fs.existsSync('sitio/json/'+name+'.json')) {
		console.log("exists")
	    		fs.readFile('sitio/json/'+name+'.json', 'utf8', (err, jsonString) => {
				    if (err) {
				        res.json({});
				       
				    }
				    try {
				        liveMenu=JSON.parse(jsonString);
				        res.json(liveMenu);
				} catch(err) {
				        res.json({});
				    }
				})
	  }
	  else{
	  	res.json({});
	  }
	
	
})
app.post("/saveprogress", function(req,res){
	name=req.body["name"];
	cuestionario=req.body["cuestionario"];
	fs.writeFile('sitio/json/'+name+'.json', JSON.stringify(cuestionario), (err) => {
	    if (err) throw err;
	    console.log(name,'.json written to file');
	    res.json({status:"saved"});
	});
	console.log(name,"cuestionario")
})
app.get('/editar', function (req, res) {
	console.log("edit");
	
});
app.listen(port, function () {
  console.log('Jouette reporting on: '+port+'!!!');
});

