const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    nazwa: {
        type: String,
        required: true
    },
    cena: {
        type: Number,
        required: true
    },
    ilosc: {
        type: Number,
        required: true
    },
    kategoria: {
        type: String,
        required: true
    },
    jednostka_miary: {
        type: String,
        required: true
    }

}, { timestamps: true }); // <--- w bazie danych dodaje się automatycznie pole z data utworzenia i data modyfikacji 

module.exports = mongoose.model('Product', productSchema);