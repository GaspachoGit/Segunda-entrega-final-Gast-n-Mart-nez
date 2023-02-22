const productsController = require('../products/controller.products')
const boxController = require('../box/controller.box')
const wholesalersController = require('../wholesaler/controller.wholesaler')
const cartController = require('../cart/controller.cart')

const router = (app) => {
  app.use('/api/products', productsController)
  app.use('/api/carts', cartController)
  app.use('/box', boxController)
  app.use('/wholesalers', wholesalersController)
};

module.exports = router