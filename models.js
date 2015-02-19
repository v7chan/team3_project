var Mongoose = require('mongoose');

var mealSchema = new Mongoose.Schema({
  name:             String,
  restaurant:       String,
  googleAddress:    String,
  cost:             Number,
  waitTime:         Number,
  location:         String,
  description:      String,
  goals:            [String],
  restrictions:     [String],
  nutrition: {
    ingredients:    String,
    information:    Mongoose.Schema.Types.Mixed
  }
});

exports.Meal = Mongoose.model('Meal', mealSchema);

var userSchema = new Mongoose.Schema({
  username:     String,
  password:     String,
  goal:         String,
  restriction:  String
});

exports.User = Mongoose.model('User', userSchema);