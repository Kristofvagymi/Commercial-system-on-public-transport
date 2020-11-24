const AdminAdvertisement = require("../03_models/AdminAdvertisement");
const mongoose = require("mongoose");
const config = require("../04_config/db.config");

mongoose
  .connect(config.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
    loadAdminAdvertisement();
  })
  .catch(err => {
    console.log({ database_error: err });
  });

function loadAdminAdvertisement(){

  // Query from frontend
  /*
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('ad', JSON.stringify({regNumbers: ['ABC-123'], title: 'Domestos', from: {hours: 12}, to: {hours: 12}}));
  */

  const adminAd = new AdminAdvertisement({regNumbers: ['ABC-123'], title: 'Domestos', from: {hours: 12}, to: {hours: 12}, path: "./99_uploads/TEST/", fileName: "dom.jpg"});

  console.log('default ads:\n');

  adminAd.save(function (err, saved) {
      if (err) console.log(err);
      else console.log(saved)
  });

}