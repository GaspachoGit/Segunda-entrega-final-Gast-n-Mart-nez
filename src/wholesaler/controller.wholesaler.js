const {Router} = require('express')
const router = Router()

router.get('/', (req,res)=>{
  res.json({msg: 'hola desde wholesaler'})
})

module.exports = router