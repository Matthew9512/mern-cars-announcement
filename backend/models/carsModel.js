const mongoose = require('mongoose');
const schema = mongoose.Schema;

const carsSchema = new schema({
   title: String,
   brand: String,
   model: String,
   images: [String],
   price: String,
   engineCapacity: String,
   horsePower: String,
   year: String,
   fuel: String,
   bodyType: String,
   transmitionType: String,
   description: String,
   created: { type: Date, default: Date.now },
   features: {
      type: Boolean,
      default: false,
   },
   seller: {
      city: String,
      contactPerson: String,
      telNumber: String,
   },
});

module.exports = mongoose.model('car', carsSchema);
