const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const uniqueValidator = require('mongoose-unique-validator')

let RolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'Debe ser obligatorio'] //Se agrega mensaje en las validaciones
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo debe ser obligatorio']
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: [true,'Rol obligatorio'],
    default: 'USER_ROLE',
    enum: RolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

usuarioSchema.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject
}

usuarioSchema.plugin( uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('Usuario', usuarioSchema)