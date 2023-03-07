const productsController = require('../products/controller.products')
const boxController = require('../box/controller.box')
const wholesalersController = require('../wholesaler/controller.wholesaler')
const cartController = require('../cart/controller.cart')
const viewsTemplateController = require('../viewsTemplate/viewsTemplate.controller')
const usersController = require('../users/controller.users')
const authController = require('../auth/controller.auth')

const router = (app) => {
  app.use('/api/products', productsController)
  app.use('/api/carts', cartController)
  app.use('/box', boxController)
  app.use('/wholesalers', wholesalersController)
  app.use('/users', usersController)
  app.use('/', viewsTemplateController)
  app.use('/auth', authController)
};

module.exports = router