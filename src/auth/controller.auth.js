const {Router} =require('express')
const passport = require('passport')
const User = require('../models/user.model')
const { isValidPassword } = require('../utils/middlewares/cryptPassword')

const router = Router()

router.post('/',passport.authenticate('login',{failureRedirect:'/failLogin'}), async(req,res)=>{
  const {email, password } = req.body
  try {
    if(!req.user){
      return res.status(400).json({msj: 'Las credenciales no coinciden'})
    }  

    req.session.user ={
      firstName: req.user.firstName,
      lastName: req.user. lastName,
      email: req.user.email,
      rol: req.user.role
    }
    res.json({msj:req.user})

  } catch (error) {
    res.status(500).json({msj: 'error interno del sistema'})
    console.log(error)
  }
})

router.get('/github',passport.authenticate('github', {scope: ['user:email']}), async(req,res)=>{

})

router.get('/failLogin', (req,res)=>{
  console.log('el logueo falló')
  res.json({error: 'No se pudo iniciar sesion'})
})

router.get('/logout',(req, res)=>{
  req.session.destroy(error =>{
    if (error) return res.json({error})
    res.redirect('/login')
  })
})


module.exports = router