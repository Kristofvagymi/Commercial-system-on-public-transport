const Advertisement = require("../03_models/Advertisement");
const AdminAdvertisement = require("../03_models/AdminAdvertisement");
const Vehicle = require("../03_models/Vehicle");
const fs = require('fs');
const User = require("../03_models/User");
const Payment = require("../03_models/Payment");
const sharp = require('sharp');
const formidable = require('formidable');
const { on } = require("process");

exports.getAdvertisements = async(req, res) => {
    try {
        Advertisement.find().populate('createdBy').then((advertisements) => {
            res.json({ advertisements: advertisements });
        })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getCustomAdvertisement = async(req, res) => {
    try {
        let hours = req.body.hours
        let regNum = req.body.regNum
        let AdminAdvertisements = []
        await AdminAdvertisement.find({ regNumbers: regNum, "from.hours": { $lte: hours }, "to.hours": { $gte: hours } }).then((advertisements) => {
            AdminAdvertisements = advertisements;
        })

        if (AdminAdvertisements.length > 0) {
            res.json({ advertisements: AdminAdvertisements });
            return;
        }

        let vehicle = await Vehicle.findOne({ registrationNumber: regNum }, { strict: false }).lean();

        if (!vehicle) {
            throw new Error({ error: "No vehicle found with given registratin number." });
        }
        console.log(hours)
        Advertisement.find({
                countries: { $in: vehicle.countries },
                "from.hours": { $lte: hours },
                "to.hours": { $gte: hours },
                appearanceLeft: { $gte: 0 }
            })
            .populate('createdBy')
            .then((ads) => {
                advertisements = ads
                    .filter((el) => {
                        return !el.createdBy.blocked
                    })
                    .map((el) => {
                        console.log(el)
                        return {
                            id: el._id,
                            title: el.title,
                            user: el.createdBy.username
                        };
                    });



                res.json({ advertisements: advertisements });
                return;
            })

    } catch (err) {
        res.status(400).json(err);
    }
}

exports.getAdvertisementContent = async(req, res) => {
    let id = req.body.id

    Advertisement.findOne({ _id: id }).then((advertisement) => {
        advertisement.appearanceLeft--;
        advertisement.save();

        res.writeHead(200, { 'content-type': 'image/*' });
        fs.createReadStream(global.appRoot + advertisement.path + advertisement.fileName).pipe(res);
    })
}

exports.getAdvertisementPreview = async(req, res) => {
    let id = req.params.id

    Advertisement.findOne({ _id: id }).then((advertisement) => {
        let transform = sharp();
        transform = transform.resize(100, 100)
        res.writeHead(200, { 'content-type': 'image/jpg' });
        fs.createReadStream(global.appRoot + advertisement.path + advertisement.fileName).pipe(transform).pipe(res);
    })
}

exports.createAd = async(req, res) => {
    try {
        const dir_path = global.appRoot + '/99_uploads/' + req.user.username;
        const form = formidable({ multiples: true });

        form.parse(req)

        form.on('fileBegin', function(name, file) {
            if (!fs.existsSync(dir_path)) {
                fs.mkdirSync(dir_path);
            }
            file.path = dir_path + "/" + file.name;
        });

        form.on('field', async(name, value) => {
            let ad = JSON.parse(value)
            let user = req.user
            let userObject = await User.findOne({ username: user.username });

            if (userObject.money < ad.appearances * 1000) {
                throw new Error("Not enough money.");
            }
            let now = Date.now()

            let payment = Payment({ createdBy: req.user._id, amount: ad.appearances * 1000, timeStamp: now, username: req.user.username, title: ad.title })
            payment.save();

            userObject.money -= ad.appearances * 1000
            userObject.save()

            ad.path = '/99_uploads/' + req.user.username + "/"
            ad.appearanceLeft = ad.appearances
            ad.createdBy = userObject._id;


            if (ad.isSubscription) {
                ad.maxAppearances = ad.appearances
                ad.lastPayed = now
            }

            const savedAd = new Advertisement(ad);
            let data = await savedAd.save();
            res.status(200).json(data);
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.deleteAd = async(req, res) => {
    try {
        Advertisement.findOne({ _id: req.params['id'] })
            .then((ad) => {
                if (!ad) { res.status(200).send({ message: 'Advertisement was deleted earlier.' }); return; }

                fs.unlink(ad.path + ad.fileName, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })

                Advertisement.deleteById(req.params['id']).then(() => {
                    res.status(200).send({ message: 'Advertisement successfully deleted' });
                });

            })
    } catch (err) {
        res.status(400).json({ err: err });
    }
}


exports.getAdvertisementsByUser = async(req, res) => {
    try {

        Advertisement.find({ createdBy: req.user._id }).then((ads) => {
            res.send({ advertisements: ads });
        })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getPayments = async(req, res) => {
    try {
        let oneMonthAgo = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)

        Payment.find({ timeStamp: { $gte: oneMonthAgo } }).populate('User').then((payments) => {
            res.send(payments);
        })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}