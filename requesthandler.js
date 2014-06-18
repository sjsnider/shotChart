var Shots = require('./db-data.js');

exports.getData = function(req, res){
  console.log(req.query.name);
    Shots.find({name: req.query.name},function(error, data){
      console.log(error);
      console.log(data[0]);

      res.send(200, data[0]);
    });
};
