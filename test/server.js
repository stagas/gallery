
/**
 * Module dependencies.
 */

var fs = require('fs')
var express = require('express');

var app = express();

app.use(express.logger('dev'));
app.use(express.bodyParser({
  uploadDir: __dirname+'/../uploads'
, keepExtensions: true
}))

app.get('/', function(req, res){
  res.sendfile('test/index.html');
});

app.post('/upload', function(req, res){
  var file = req.files.file;
  if (!file) return res.send(400)
  fs.rename(file.path, __dirname+'/gallery/'+file.name, function (err) {
    if (err) return res.send(400);
    res.send(200);
  })
});

app.post('/failure', function(req, res){
  res.send(500, 'something blew up');
});

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/..'));

app.listen(4000);
console.log('listening on port 4000');
