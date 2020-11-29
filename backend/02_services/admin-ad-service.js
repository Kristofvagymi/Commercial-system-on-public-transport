const AdminAdvertisement = require("../03_models/AdminAdvertisement");
const Vehicle = require("../03_models/Vehicle");
const fs = require('fs');
const sharp = require('sharp');
const formidable = require('formidable');

exports.createAdminAd = async(req, res) => {
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
            ad.path = '/99_uploads/' + req.user.username + "/"

            const adToSave = new AdminAdvertisement(ad);
            adToSave.save();

            res.status(200).send({ message: 'Advertisement successfully created' });
        });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

exports.deleteAdminAd = async(req, res) => {
    try {
        AdminAdvertisement.findOne({ _id: req.params['id'] })
            .then((ad) => {
                if (!ad) { res.status(200).send({ message: 'Advertisement was deleted earlier.' }); return; }

                fs.unlink(ad.path + ad.fileName, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })

                AdminAdvertisement.deleteById(req.params['id']).then(() => {
                    res.status(200).send({ message: 'Advertisement successfully deleted' });
                });

            })
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err });
    }
}

exports.getAdminAds = async(req, res) => {
    try {
        AdminAdvertisement.find().then((advertisements) => {
            res.json({ advertisements: advertisements });
        })
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

exports.getAdminAdvertisementPreview = async(req, res) => {
    let id = req.params.id

    AdminAdvertisement.findOne({ _id: id }).then((advertisement) => {
        let transform = sharp();
        transform = transform.resize(100, 100)
        res.writeHead(200, { 'content-type': 'image/jpg' });
        fs.createReadStream(global.appRoot + advertisement.path + advertisement.fileName).pipe(transform).pipe(res);
    })
}