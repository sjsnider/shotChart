var mongoose = require('mongoose');
var url = 'mongodb://sjsnider:minlyhr13@ds030827.mongolab.com:30827/MongoLab-lo';
mongoose.connect(url);
module.exports = mongoose;