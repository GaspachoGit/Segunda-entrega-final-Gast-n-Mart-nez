const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')

const productsColection = 'product';

const productSchema = mongoose.Schema({
  type: String,
  brand: String,
  size: {
    type: String,
    enum: ["undefined", "RN", "RN+", "P", "M", "G", "XG", "XXG"],
    default: "undefined"
  },
  name: String,
  description: String,
  img: String,
  unitPrice: Number,
  boxPrice: Number,
  stock: Number,
});

mongoose.plugin(mongoosePaginate)

const Product = mongoose.model(productsColection, productSchema);
module.exports = Product;
