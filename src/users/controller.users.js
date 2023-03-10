const {Router} = require('express')
const User = require('../models/user.model')

const router = Router()

router.post('/', async(req,res)=>{
  const {firstName, lastName, age, email, password} = req.body
  try {
    const newUserInfo = {
    firstName,
    lastName,
    age,
    email,
    password,
  }
  if(email === 'adminCoder@coder.com'){
    newUserInfo.role = 'admin'
  }
  const newUser = await User.create(newUserInfo)
  res.status(201).json({msj:'usuario creado exitósamente'})
  } catch (error) {
    if(error.code === 11000){
      return res.status(400).json({Error: 'el usuario ya fue creado'})
    }
      return res.status(500).json({Error: 'error interno del servidor'})
  }
  
})

module.exports = router