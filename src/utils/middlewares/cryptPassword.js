const bcrypt = require ('bcrypt')

const createHash = password => {
  const salt = bcrypt.genSaltSync(10)
  const passEncrypted = bcrypt.hashSync(password, salt)
  return passEncrypted
}

const isValidPassword = (user, password) =>{
  const response = bcrypt.compareSync(password, user.password)
  return response
}

module.exports = {
  createHash,
  isValidPassword
}