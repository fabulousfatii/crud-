const mongoose= require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    img:{type:String, default:null},
});

module.exports = mongoose.model('product', productSchema);