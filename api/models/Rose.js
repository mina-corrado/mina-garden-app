const mongoose = require('mongoose');
const roseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: false}
});
module.exports = mongoose.model('Rose', roseSchema);