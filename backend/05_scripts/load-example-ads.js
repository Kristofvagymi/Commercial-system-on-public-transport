const Advertisement = require("../03_models/Advertisement");
const mongoose = require("mongoose");
const config = require("../04_config/db.config");

mongoose
  .connect(config.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
    loadAdvertisement();
  })
  .catch(err => {
    console.log({ database_error: err });
  });

function loadAdvertisement(){
    const ad = new Advertisement({country: 'Pest', title: 'Knorr', from: {hours: 12, minutes: 30}, to: {hours: 12, minutes: 30}, pictures: [{path: "/example-ad/example.jpg"}] });

    console.log('default ads:\n');

    ad.save(function (err, saved) {
        if (err) console.log(err);
        else console.log(saved)
    });

}