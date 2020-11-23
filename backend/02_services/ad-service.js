const Advertisement = require("../03_models/Advertisement");
const Vehicle = require("../03_models/Vehicle");
const fs = require('fs');

exports.getAdvertisements = async (req, res) => {
    try{
        Advertisement.find().then((advertisements) => {
            res.json({ advertisements: advertisements });
      })
    } catch (err) {
      res.status(400).json({ err: err });
    }
}

exports.getCustomAdvertisement = async (req, res) => {
    try{
        let {hours, minutes} = req.body.timeStamp
        let regNum = req.body.regNum

        let vehicle = await Vehicle.find({registrationNumber: regNum});

        Advertisement.find({countries: {$in: vehicle.countries}, from: {}, to: {} }).then((advertisements) => {
            res.json({ advertisement: advertisements[0] });
      })
    } catch (err) {
      res.status(400).json({ err: err });
    }
}

exports.createAd = async (req, res) => {
    try{
      let ad = JSON.parse(req.body.ad)
      ad.path = req.body.path
      ad.fileName = req.body.fileName
      const savedAd = new Advertisement(ad);
      savedAd.save();

      res.status(200).json({ savedAd });
    } catch (err) {
      res.status(400).json({ err: err });
    }
}

exports.deleteAd = async (req, res) => {
    try{
        Advertisement.findOne({_id:  req.params['id']})
          .then((ad) => {
            if( !ad ) {res.status(200).send({ message : 'Advertisement was deleted earlier.'});return;}
            
            fs.unlink(ad.path + ad.fileName, (err) => {
              if (err) {
                console.error(err)
                return
              }
            })

            Advertisement.deleteById(req.params['id']).then(()=>{
              res.status(200).send({ message : 'Advertisement successfully deleted'});
            });

          })
    } catch (err) {
      res.status(400).json({ err: err });
    }
}