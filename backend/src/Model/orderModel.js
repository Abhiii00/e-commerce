const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true,
    },
    transactionId: {
        type: String,
    },
    sessionId: {
        type: String,
    },
    products: {
        type: Array,
    },
    paymentStatus:{
        type: String,
    }
},{timestamps: true})

const order = mongoose.model('order', orderSchema)

module.exports = order