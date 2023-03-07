const {Router} = require('express')

const router = Router()

router.get('/login', (req,res)=>{
  res.render('login.handlebars')
})
router.get('/signup', (req,res)=>{
  res.render('signup.handlebars')
})
router.get('/', (req,res)=>{
  const {user} = req.session
  console.log(user)
  res.render('profile.handlebars',{user})
})

module.exports = router