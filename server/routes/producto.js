const express = require('express')
let { verifica_token } = require('../middlewares/authentication')

let app = express();

let Producto = require('../models/producto')

// Obtener todos los productos
app.get('/producto', (req, res) => {
  //trae todos los productos
  //populate; usuario categoria
  //paginado
  let desde = req.query.desde || 0
  desde = Number(desde)

  let limite = req.query.limite || 5
  limite = Number(limite)

  Producto.find({disponible: true})
    .populate('categoria', 'descripcion')
    .populate('usuario', 'nombre email')
    .skip(desde)
    .limit(limite)    
    .exec((err, productoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        })
      }

      res.json({
        ok: true,
        productoDB
      })

    })

})

// Obtener producto por ID
app.get('/producto/:id', (req, res) => {
  let id = req.params.id

  Producto.findById(id, (err, productoDB) => {
    if(err){
      return res.status(500).json({
        ok: false,
        err: {
          message: "No se encontro el id"
        }
      })
    }

    if(!productoDB){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      productoDB
    })

  })

})


// Crear un nuevo producto
app.post('/producto', verifica_token,(req, res) => {
  //grabar el usuario
  //una categoria del listado

  let body = req.body

  let producto = new Producto({
    nombre: body.nombre,
    precioUni: body.precio,
    descripcion: body.descripcion,
    categoria: body.categoria,
    usuario: req.usuario._id
  })

  producto.save( (err,productoDB) => {
    if(err){
      return res.status(500).json({
        err: false,
        err
      })
    }

    if(!productoDB){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.status(201).json({
      ok: true,
      producto: productoDB
    })

  })

})

// Actualizar un nuevo producto
app.put('/producto/:id', verifica_token,(req, res) => {
  let id = req.params.id
  let body = req.body
  

 Producto.findById(id, (err, productoDB) => {
  if(err){
    return res.status(500).json({
      ok: false,
      err
    })
  }

  if (!productoDB) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'El id no existe'
      }
    })
  }

  productoDB.nombre = body.nombre
  productoDB.precioUni = body.precioUni
  productoDB.descripcion = body.descripcion
  productoDB.disponible = body.disponible
  productoDB.categoria = body.categoria

  productoDB.save( (err, producto_guardado) => {
    if(err){
      return res.status(500).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      producto: producto_guardado
    })

  })

 })

})

// Actualizar un nuevo producto
app.delete('/producto/:id', (req, res) => {
  //borrar un producto // Actualizar Disponible
  let id = req.params.id
  
  let producto_body = {
    disponible: false
  }

  Producto.findByIdAndUpdate(id, producto_body, {new: true, runValidators: true}, (err, productoDB) => {
    if(err){
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'No se encontro el producto'
        }
      })
    }

    res.json({
      ok: true,
      err: {
        message: 'Producto eliminado correctamente'
      }
    })

  })

})

app.get('/producto/buscar/:termino', verifica_token,(req,res) => {

  let termino = req.params.termino
  let regex = RegExp(termino, 'i')

  Producto.find({ nombre: regex })
    .populate('categoria', 'descripcion')
    .populate('usuario', 'nombre email') 
    .exec((err, productoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        })
      }

      res.json({
        ok: true,
        productoDB
      })

    })

})

module.exports = app