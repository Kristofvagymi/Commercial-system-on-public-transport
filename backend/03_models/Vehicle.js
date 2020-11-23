const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
    registrationNumber: {
      type: String,
      required: [true, "Please Include registration number."],
      unique: true
    },
    countries: [
        {
          country: {
            type: String,
            required: [true, "Please Include countries."]
          }
        }
      ]
  });

const Vehicle = mongoose.model("Vehicle", vehicleSchema, "Vehicle");
module.exports = Vehicle;