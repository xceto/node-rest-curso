const mongoose = require('mongoose')

let Schema = mongoose.Schema

let categoriaSchema = new Schema({
  descripcion: {
    type: String,
    unique: true,
    required: [true, 'Debe ser obligatorio'] //Se agrega mensaje en las validaciones
  },
  usuario: {
    type: Schema.Types.ObjectId, ref: 'Usuario'
  },
  estado: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('Categoria', categoriaSchema)