const Advertisement = require("../03_models/Advertisement");
const AdminAdvertisement = require("../03_models/AdminAdvertisement");
const Vehicle = require("../03_models/Vehicle");
const fs = require('fs');
const User = require("../03_models/User");

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
      let hours = req.body.hours
      let regNum = req.body.regNum
      let AdminAdvertisements = []
      await AdminAdvertisement.find({regNumbers: regNum,"from.hours": {$gte : hours} , "to.hours"  : {$lte : hours} }).then((advertisements) => {
        AdminAdvertisements = advertisements;
      })

      if(AdminAdvertisements.length > 0){
        res.json({ advertisements: AdminAdvertisements });
        return;
      }

      let vehicle = await Vehicle.findOne({registrationNumber: regNum},{ strict: false }).lean();

      if(!vehicle){
        console.log("no vehicle")
        throw new Error({ error: "No vehicle found with given registratin number." });
      }
      Advertisement.find({countries: {$in: vehicle.countries},"from.hours": {$gte : hours} , "to.hours"  : {$lte : hours}, appearanceLeft:  {$gte : 0} }).then((advertisements) => {
        res.json({ advertisements: advertisements });
        return;
      })

    } catch (err) {
      res.status(400).json(err);
    }
}

exports.getAdvertisementContent = async (req, res) => {
    let id = req.body.id
    
    Advertisement.findOne(_id: id).then((advertisement) => {
        advertisement.appearanceLeft--;
        advertisement.save();
        
        res.writeHead(200,{'content-type':'image/jpg'});
        fs.createReadStream(advertisement.path + advertisement.fileName).pipe(res);
    })
}

exports.createAd = async (req, res) => {
    try{
      let ad = JSON.parse(req.body.ad)
      let user = req.user
      let userObject = await User.findOne({username: user.username});

      if(userObject.money <ad.appearances * 1000) {
        throw new Error("Not enough money.");
        return;
      }
      userObject.money -= ad.appearances * 1000
      userObject.save()

      ad.path = req.body.path
      ad.fileName = req.body.fileName
      ad.appearanceLeft = ad.appearances
      ad.createdBy = userObject._id;
      

      if(ad.isSubscription) {
        ad.maxAppearances = ad.appearances
        ad.lastPayed = Date.now()
      }

      const savedAd = new Advertisement(ad);
      savedAd.save();

      res.status(200).json({ savedAd });
    } catch (err) {
      console.log(err)
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
