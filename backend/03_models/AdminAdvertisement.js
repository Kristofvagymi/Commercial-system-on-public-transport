const mongoose = require("mongoose");

const adminAdvertisementSchema = mongoose.Schema({
    regNumbers: [{
        type: String,
        required: [true, "Please Include registation numbers."]
    }],
    fileName: {
        type: String,
        unique: true,
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
    }  
});

adminAdvertisementSchema.statics.deleteById= function(id, cb){
  return this.deleteOne({_id: id}, cb);
};

const AdminAdvertisement = mongoose.model("AdminAdvertisement", adminAdvertisementSchema, "AdminAdvertisement");
module.exports = AdminAdvertisement;