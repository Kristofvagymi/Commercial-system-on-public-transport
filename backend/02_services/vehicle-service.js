const Vehicle = require("../03_models/Vehicle");

exports.getVehicles = async (req, res) => {
    try{
        Vehicle.find().then((vehicles) => {
          res.json({ vehicles: vehicles });
        })
      } catch (err) {
        res.status(400).json({ err: err });
      }
}

exports.getVehiclesByRegistrationNumber = async (req, res) => {
    try{
        Vehicle.find({registrationNumber: req.params['registrationNumber']}).then((vehicle) => {
          res.json({ vehicle: vehicle });
        })
      } catch (err) {
        res.status(400).json({ err: err });
      }
}