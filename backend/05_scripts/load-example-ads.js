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

function loadAdvertisement() {

    // Query from frontend
    /*
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('ad', JSON.stringify({countries: ['Pest'], title: 'Domestoas', from: {hours: 12}, to: {hours: 12}}));
    */

    const ad1 = new Advertisement({ countries: ['Pest'], title: 'Domestos', from: { hours: 12 }, to: { hours: 12 }, path: "./99_uploads/TEST/", fileName: "dom.jpg", appearanceLeft: 10, isSubscription: false, createdBy: "eeeeeeeeeeee" });
    const ad2 = new Advertisement({ countries: ['Pest'], title: 'Domwwwwestos', from: { hours: 12 }, to: { hours: 12 }, path: "./99_uploads/TEST/", fileName: "dom.jpg", appearanceLeft: 10, isSubscription: false, createdBy: "eeeeeeeeeeee" });
    const ad3 = new Advertisement({ countries: ['Pest'], title: 'wwafsdfsd', from: { hours: 12 }, to: { hours: 12 }, path: "./99_uploads/TEST/", fileName: "dom.jpg", appearanceLeft: 10, isSubscription: false, createdBy: "eeeeeeeeeeee" });

    console.log('default ads:\n');

    ad1.save(function(err, saved) {
        if (err) console.log(err);
        else console.log(saved)
    });

    ad2.save(function(err, saved) {
        if (err) console.log(err);
        else console.log(saved)
    });

    ad3.save(function(err, saved) {
        if (err) console.log(err);
        else console.log(saved)
    });


}