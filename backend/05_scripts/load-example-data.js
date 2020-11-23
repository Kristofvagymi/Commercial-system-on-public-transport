const User = require("../03_models/User");
const mongoose = require("mongoose");
const config = require("../04_config/db.config");

mongoose
  .connect(config.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
    loadUsers();
  })
  .catch(err => {
    console.log({ database_error: err });
  });

function loadUsers(){
    const transport_admin = new User({username: 'transport_admin', password: 'pw', role: 'transport_admin', money: 0, blockable: false});
    const commercial_admin = new User({username: 'commercial_admin', password: 'pw', role: 'commercial_admin', money: 0, blockable: false});
    const advertiser = new User({username: 'advertiser', password: 'pw', role: 'advertiser', money: 0, blockable: true});

    console.log('default users:\n');
    /*console.log(transport_admin);
    console.log(commercial_admin);
    console.log(advertiser);*/

    transport_admin.save(function (err, saved) {
        if (err) console.log(err);
        else console.log(saved)
    })
    commercial_admin.save(function (err, saved) {
        if (err) console.log(err);
        else console.log(saved)
    })
    advertiser.save(function (err, saved) {
        if (err) console.log(err);
        else console.log(saved)
    })

}