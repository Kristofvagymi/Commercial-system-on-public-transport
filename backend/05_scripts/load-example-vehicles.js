const Vehicle = require("../03_models/Vehicle");
const mongoose = require("mongoose");
const config = require("../04_config/db.config");

mongoose
    .connect(config.url, { useNewUrlParser: true })
    .then(() => {
        console.log("Database is connected");
        loadvehicles();
    })
    .catch(err => {
        console.log({ database_error: err });
    });

function loadvehicles() {
    const vehicle1 = new Vehicle({ registrationNumber: 'ABC-123', countries: ["Vas", "Zala"] });
    const vehicle2 = new Vehicle({ registrationNumber: 'DEF-420', countries: ["Pest", "Baranya"] });
    const vehicle3 = new Vehicle({ registrationNumber: 'LOL-000', countries: ["Pest", "Baranya", "Somogy"] });

    console.log('default vehicles:\n');

    vehicle1.save(function(err, saved) {
        if (err) console.log(err);
        else console.log(saved)
    })
    vehicle2.save(function(err, saved) {
        if (err) console.log(err);
        else console.log(saved)
    })
    vehicle3.save(function(err, saved) {
        if (err) console.log(err);
        else console.log(saved)
    })

}