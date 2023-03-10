const {Router} =require('express')
const User = require('../models/user.model')

const router = Router()

router.post('/', async(req,res)=>{
  const {email, password } = req.body
try {
  const usuario = await User.findOne({email}) 
  
  if (!usuario) {
    return res.status(400).json({msj: 'el usuario y la contraseña no coinciden'})
  }
  
  if (usuario.password !== password) {
    return res.status(400).json({msj: 'el usuario y la contraseña no coinciden'})
  }
  
/*   if(usuario.email === 'adminCoder@coder.com' && usuario.password === password){
    usuario.role = 'admin'
    await User.updateOne({email: 'adminCoder@coder.com'}, {role: 'admin'})
  } */

  req.session.user ={
    firstName: usuario.firstName,
    lastName: usuario. lastName,
    email: usuario.email,
    rol: usuario.role
  }
  console.log('este consoloe log estoy usando' + usuario + '--------------')

  res.json({msj:'sesion iniciada'})

} catch (error) {
  res.status(500).json({msj: 'error interno del sistema'})
  console.log(error)
}
})

router.get('/logout',(req, res)=>{
  req.session.destroy(error =>{
    if (error) return res.json({error})
    res.redirect('/login')
  })
})


module.exports = router