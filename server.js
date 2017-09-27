var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var app = express();
app
	.get('/', function(req, res){
			res.sendFile(path.join(__dirname+'/index.html'));
	})
	.use(serveStatic(__dirname + '/public'))
	.use(error)
	.listen(process.env.PORT || 3000)

function error(req, res){
	res.end('error');
}