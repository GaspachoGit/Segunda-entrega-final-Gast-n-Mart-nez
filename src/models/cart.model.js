const mongoose = require('mongoose')

const cartColection = 'carts'

const cartSchema = mongoose.Schema({
  products: {
    type: [{
      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        
      },
      quantity:{
        type: Number,
        default:1
      }
      
    }],
    default: []
  }
});
/* cartSchema.pre('findOne', function(){
  this.populate('products.product')
}) */

const Cart = mongoose.model(cartColection, cartSchema)

module.exports = Cart