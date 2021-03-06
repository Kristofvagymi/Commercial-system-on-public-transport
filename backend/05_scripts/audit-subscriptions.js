const Advertisement = require("../03_models/Advertisement");
const User = require("../03_models/User");
const Payment = require("../03_models/Payment");
const mongoose = require("mongoose");


exports.auditSubscriptions = async() => {
    let oneMonthAgo = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)

    Advertisement.find({ isSubscription: true, lastPayed: { $lte: oneMonthAgo } }).populate('createdBy').then((advertisements) => {
        try {

            for (let index in advertisements) {
                let advertisement = advertisements[index];

                if (advertisement.createdBy.money < advertisement.appearances * 1000) {
                    throw new Error("Not enough money.");
                    return;
                }
                let now = Date.now();
                advertisement.createdBy.money -= advertisement.appearances * 1000;
                advertisement.createdBy.save();
                advertisement.appearanceLeft = advertisement.maxAppearances;
                advertisement.lastPayed = now;
                advertisement.save()

                let payment = Payment({
                    createdBy: advertisement.createdBy,
                    amount: advertisement.appearances * 1000,
                    timeStamp: now,
                    username: advertisement.createdBy.username,
                    title: advertisement.title
                })
                payment.save();
            }

        } catch (err) {
            console.log(err);
        }
    })

}