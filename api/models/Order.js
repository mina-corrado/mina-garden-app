const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    customer: {type: String, required: true},
    total: {type: Number, required: true},
    created: {type: String, required: true},
    items: [{
        title : String,
        price : mongoose.Types.Decimal128,
        quantity: Number
    }],
    address: {type: String, required: false},
    status: {type: String, default: "pending", required: true}
});
module.exports = mongoose.model('Order', orderSchema);