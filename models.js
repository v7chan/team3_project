var Mongoose = require('mongoose');

var mealSchema = new Mongoose.Schema({
  name:             String,
  restaurant:   String,
  googleAddress:    String,
  cost:             Number,
  waitTime:         Number,
  college:          String,
  description:      String,
  goals:            [String],
  restrictions:     [String],
  nutrition: {
    ingredients:    String,
    information:    Mongoose.Schema.Types.Mixed
  }
});

exports.Meal = Mongoose.model('Meal', mealSchema);