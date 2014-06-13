var mongoose = require('mongoose');

var ShotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: String,
    required: true
  }
});

ShotSchema.pre('save', function(next){
  next();
});

var NewShot = mongoose.model('shots', ShotSchema);

module.exports = NewShot;