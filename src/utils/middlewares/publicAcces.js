function publicAccess (req, res, next){
  
  if(req.session.user) return res.redirect('/api/products')
  next()
}

module.exports = publicAccess