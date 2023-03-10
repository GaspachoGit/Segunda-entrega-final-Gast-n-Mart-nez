const { Router } = require("express");
const router = Router();
const Cart = require("../models/cart.model");

router.get("/", async (req, res) => {
  const carts = await Cart.find()
  res.json({ msj: carts });
});

router.get('/:cid', async (req,res)=>{
  const {cid} = req.params
  try {
    const cart = await Cart.findOne({_id: cid}).populate('products.product')

    const products = cart.products.map(cartProduct => {
      const product = cartProduct.product;
      const cartItem = cart.products.find(item => item.product._id === product._id);
      if (cartItem) {
        return {
          ...product.toObject(),
          quantity: cartItem.quantity
        };
      }
      return product.toObject();
    });

    res.render('cart.handlebars',{products})
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async(req,res)=>{
  const {productId, quantity} = req.body
  const cart = {
    productId,
    quantity
  }

  try {
    await Cart.create(cart)
    res.json({msg:'Cart Created'})
  } 
  catch (error) {
    res.json({msg:error})
  }
})

router.patch('/:cartId/products/:productId', async (req, res) => {
  const { cartId, productId } = req.params;
  const { cantidad } = req.body;
  let quantity = cantidad

  if(!quantity){
    quantity = 1
  }

  try {
    const cart = await Cart.findOne({_id: cartId})
    const existingProductIndex = cart.products.findIndex(p => p.product._id.toString() === productId)//busco si existe el indice del producto seleccionado
    if (existingProductIndex !== -1) { //si existe entonces le sumo quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });//sino, le pusheo el quantity que por defoult es 1
    }
    await cart.save()//guardo el cart, me costó un huevo encontrar un método así porfa profe valore jejeje
    res.status(200).json({ message: 'Product added to cart', cart })
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error }); 
  }
})


router.delete('/:cartId/products/:productId', async (req, res) => {
  const { cartId, productId } = req.params;

  try {
    const result = await Cart.updateOne(
      { _id: cartId },
      { $pull: { products: { product: productId } } },
      {new: true}
    );

    if (result.modifiedCount > 0) { //aquí verifico si la cantidad de archivos modificados es mayor a 0, costó un monton encontrar esta funcion, en todos lados me decía que use nModified, pero no está habilitado para esta version de Mongoose
      res.status(200).json({ message: 'Product removed from cart', result });
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart', error });
  }
});

router.patch('/:cartId', async(req,res)=>{
  const {cartId} = req.params
  const products = req.body

  try {
    const result = await Cart.updateOne(
      {_id: cartId},
      {$push:{products:{$each:products}}})
    if(result.modifiedCount>0){
      res.status(200).json({message:'cart updated successfully'})
    }else{
      res.status(404).json({message: 'cart not found'})
    }
  } catch (error) {
    res.status(500).json({message: 'Error adding produt to cart', error})
  }
})

router.delete('/:cartId', async (req,res)=>{
  const {cartId} = req.params
  try {
    const result = await Cart.updateOne(
      { _id: cartId },
      { $set: { products: [] } }
    )

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'All products removed from cart' });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing products from cart', error });
  }
})

router.delete('/',async(req,res)=>{
  await Cart.deleteMany()
  res.send('carritos eliminados')
})

module.exports = router;
