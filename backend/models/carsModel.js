const mongoose = require('mongoose');
const schema = mongoose.Schema;

const carsSchema = new schema({
   title: String,
   brand: {
      type: String,
      lowercase: true,
   },
   model: {
      type: String,
      lowercase: true,
   },
   images: [String],
   price: String,
   engineCapacity: String,
   horsePower: String,
   year: String,
   fuel: String,
   bodyType: {
      type: String,
      lowercase: true,
   },
   transmitionType: {
      type: String,
      lowercase: true,
   },
   description: String,
   created: { type: Date, default: Date.now },
   features: {
      type: Boolean,
      default: false,
   },
   active: { type: Boolean, default: true },
   seller: {
      sellerId: String,
      city: String,
      contactPerson: String,
      telNumber: String,
   },
});

module.exports = mongoose.model('car', carsSchema);
