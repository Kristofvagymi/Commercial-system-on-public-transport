const AdminAdvertisement = require("../03_models/AdminAdvertisement");
const Vehicle = require("../03_models/Vehicle");
const fs = require('fs');

exports.createAdminAd = async (req, res) => {
    try{
      let ad = JSON.parse(req.body.ad)
      ad.path = req.body.path
      ad.fileName = req.body.fileName

      const adToSave = new AdminAdvertisement(ad);
      adToSave.save();

      res.status(200).send({ message : 'Advertisement successfully created'});
    } catch (err) {
      res.status(400).json({ err: err });
    }
}

exports.deleteAdminAd = async (req, res) => {
  try{
    AdminAdvertisement.findOne({_id:  req.params['id']})
      .then((ad) => {
        if( !ad ) {res.status(200).send({ message : 'Advertisement was deleted earlier.'});return;}
        
        fs.unlink(ad.path + ad.fileName, (err) => {
          if (err) {
            console.error(err)
            return
          }
        })

        AdminAdvertisement.deleteById(req.params['id']).then(()=>{
          res.status(200).send({ message : 'Advertisement successfully deleted'});
        });

      })
} catch (err) {
  console.log(err)
  res.status(400).json({ err: err });
}
}

exports.getAdminAds = async (req, res) => {
  try{
    AdminAdvertisement.find().then((advertisements) => {
      res.json({ advertisements: advertisements });
    })
  } catch (err) {
    res.status(400).json({ err: err });
  }
}