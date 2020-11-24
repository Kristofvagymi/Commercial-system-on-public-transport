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

  // Query from frontend
  /*
  const formData = new FormData();
  formData.append('file', this.file);
  formData.append('ad', JSON.stringify({countries: ['Pest'], title: 'Domestoas', from: {hours: 12}, to: {hours: 12}}));
  */

  const ad = new Advertisement({countries: ['Pest'], title: 'Domestos', from: {hours: 12}, to: {hours: 12}, path: "./99_uploads/TEST/", fileName: "dom.jpg"});

  console.log('default ads:\n');

  ad.save(function (err, saved) {
      if (err) console.log(err);
      else console.log(saved)
  });

}