const Advertisement = require("../03_models/Advertisement");

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
        // Initial solution
        Advertisement.find().then((advertisements) => {
            res.json({ advertisement: advertisements[0] });
      })
    } catch (err) {
      res.status(400).json({ err: err });
    }
}

exports.createAd = async (req, res) => {
    try{
        // TODO: Save to file
        const ad = new Advertisement(req.body);
        ad.save();
    } catch (err) {
      res.status(400).json({ err: err });
    }
}

exports.deleteAd = async (req, res) => {
    try{
        // TODO: delete pictures from disk
        Advertisement.deleteOne({_id:  req.params['id']});
    } catch (err) {
      res.status(400).json({ err: err });
    }
}