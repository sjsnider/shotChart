var app = require('./server-config.js');
var mongoose = require('mongoose');
var url = 'mongodb://sjsnider:minlyhr13@ds030827.mongolab.com:30827/MongoLab-lo';
mongoose.connect(url);
var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);
