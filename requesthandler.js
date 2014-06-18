var Shots = require('./db-data.js');

exports.getData = function(req, res){
  console.log(req.query.name);
    Shots.find({name: req.query.name},function(error, data){
      console.log(error);
      console.log(data[0]);

      res.send(200, data[0]);
    });
};

exports.getAllPlayers = function(req, res){
  console.log('hello');
  Shots.find({}, 'name', {sort: {name:1}}, function(error,data){
    res.send(200, data);
  });
};
