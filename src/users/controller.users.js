const {Router} = require('express')
const passport = require('passport')
const User = require('../models/user.model')
const { createHash } = require('../utils/middlewares/cryptPassword')

const router = Router()

router.post('/', passport.authenticate('register', {failureRedirect: '/failRegister'}), async(req,res)=>{
  const {firstName, lastName, age, email, password} = req.body
  
  try {
    res.json({message:'usuario registrado'})

  } catch (error) {
    if(error.code === 11000){
      return res.status(400).json({Error: 'el usuario ya fue creado'})
    }
      return res.status(500).json({Error: 'error interno del servidor'})
  }
  
})
router.get('/failRegister', async (req,res)=>{
  console.log('falló el registro')
  res.json({msj:'falló el registro'})
})


module.exports = router