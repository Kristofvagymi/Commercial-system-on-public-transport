const mongoose = require("mongoose");

const adSchema = mongoose.Schema({
  countries: [{
    type: String,
    required: [true, "Please Include countries."]
  }],
  title: {
    type: String,
    unique: true,
    required: [true, "Please Include title."]
  },
  fileName: {
    type: String,
    required: [true, "Please Include file name."]
  },
  from: {
      hours: {
          type: Number, required: [true, "Please Include hour."], min: 0, max: 23
      }
  },
  to: {
      hours: {
          type: Number, required: [true, "Please Include hour."], min: 0, max: 23
      }
  },
  path: {
    type: String,
    required: [true, "Please Include path to picture."]
  },
  appearanceLeft: {
    type: Number,
    required: true
  },
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  isSubscription: {
    type: Boolean,
    required: true
  },
  maxAppearances: {
    type: Number
  },
  lastPayed: {
    type: Date
  }
});

adSchema.statics.deleteById= function(id, cb){
  return this.deleteOne({_id: id}, cb);
};

const Advertisement = mongoose.model("Advertisement", adSchema, "Advertisement");
module.exports = Advertisement;