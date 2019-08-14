// Verificar Token
const jwt = require('jsonwebtoken')


let verifica_token = ( req ,res ,next ) => {

  let token = req.get('token')

  jwt.verify( token, process.env.SEMILLA, (err, decoded) => {
    if(err){
      return res.status(401).json({
        ok: false,
        err
      })
    }

    req.usuario = decoded.usuario
    next();
  })
}

let verifica_admin_role = (req, res, next) => {

  let usuario = req.usuario

  console.log(usuario)
  if  (usuario.role === 'ADMIN_ROLE') {
    next();
  }else{

    res.json({
      ok: false,
      err: {
        message: 'El usuario no es administrador'
      }
    })
  
  }

}

module.exports = {
  verifica_token,
  verifica_admin_role
}