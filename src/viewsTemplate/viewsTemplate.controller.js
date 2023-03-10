const {Router} = require('express')
const publicAccess = require('../utils/middlewares/publicAcces')

const router = Router()

router.get('/login', publicAccess, (req,res)=>{
  res.render('login.handlebars')
})
router.get('/signup', publicAccess, (req,res)=>{
  res.render('signup.handlebars')
})


module.exports = router