const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    amount: { type: Number, required: true },
    timeStamp: { type: Date, required: true },
    title: { type: String, required: true },
})

const Payment = mongoose.model("Payment", paymentSchema, "Payment");
module.exports = Payment;