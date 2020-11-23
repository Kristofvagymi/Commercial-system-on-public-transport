const mongoose = require("mongoose");

const adSchema = mongoose.Schema({
    country: {
      type: String,
      required: [true, "Please Include countries."]
    },
    title: {
      type: String,
      unique: true,
      required: [true, "Please Include title."]
    },
    from: {
        hours: {
            type: Number, required: [true, "Please Include hour."], min: 0, max: 23
        },
        minutes: {
            type: Number, required: [true, "Please Include minute."], min: 0, max: 59
        }
    },
    to: {
        hours: {
            type: Number, required: [true, "Please Include hour."], min: 0, max: 23
        },
        minutes: {
            type: Number, required: [true, "Please Include minute."], min: 0, max: 59
        }
    },
    pictures: [
        {
          path: {
            type: String,
            required: [true, "Please Include path to picture."]
          }
        }
      ]
  });

const Advertisement = mongoose.model("Advertisement", adSchema, "Advertisement");
module.exports = Advertisement;