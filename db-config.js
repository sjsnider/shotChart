var mongoose = require('mongoose');
var url = process.env.MONCONNECT;
mongoose.connect(url);
module.exports = mongoose;