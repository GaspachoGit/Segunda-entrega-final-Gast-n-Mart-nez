const {Router} = require('express')
const router = Router()

router.get('/', (req,res)=>{
  res.json({msg: 'hola desde box'})
})

module.exports = router