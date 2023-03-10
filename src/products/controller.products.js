const { Router } = require("express");
const router = Router();
const Product = require("../models/products.models");
const privateAccess = require("../utils/middlewares/privateAcces");

router.get("/", privateAccess, async (req, res) => {
  const { orderBy, type, brand, size, page, perPage,  } = req.query;
  const {user} = req.session
  console.log(req.session.user)
  const query={}//Solamente deseo filtrar por esos campos
  if(type) query.type = type
  if(brand) query.brand = brand
  if(size) query.size = size

  const order = orderBy || 'name'

  const limit = perPage || 10
  
  const options = {
    page: page||1,
    sort: {[orderBy]: 1},
    limit
  }

  try {
    const products = await Product.paginate(query, options);
    const productsMapped = products.docs.map(({name, description, unitPrice, type, _id})=>({
      id: _id,
      name,
      description,
      unitPrice,
      type
    }))
    res.render('products.handlebars',{ productsMapped, user });

  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { type, brand, size, name, description, img, unitPrice, boxPrice, stock} = req.body;
  const product = { type, brand, size, name, description, img, unitPrice, boxPrice, stock};
  try {
    await Product.create(product);
    res.status(201).json({ msj: "product added" });
  } catch (error) {
    console.log(error);
  }
});

router.patch('/:pid', async(req,res)=>{
  const campos = req.body
  const {pid} = req.params
  
  const filter = {_id: pid}
/*   const update = {unitPrice:unitPrice} */

  try {
    await Product.updateOne(filter, {$set:campos}) 
    res.send('Product updated')
  } catch (error) {
    console.log(error)
  }

})

router.delete("/", async (req, res) => {
  await Product.deleteMany();
  res.send("productos eliminados");
});
module.exports = router;
