const express = require('express');

let { verifica_token, verifica_admin_role } = require('../middlewares/authentication')

let app = express();

let Categoria = require('../models/categoria')

app.get('/categoria', verifica_token, (req, res) => {
  //mostrar todas las categorias.
  Categoria.find({})
  .sort('descripcion')
  .populate('usuario', 'nombre')
  .exec((err, categorias) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      categorias
    })

  })
})

app.get('/categoria/:id', verifica_token, (req, res) => {
  //mostrar categoria por id.
  let id = req.params.id
  console.log(id)

  Categoria.findById(id, (err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      err: {
        message: 'ID no encontrado'
      }
    })

  })

})

app.post('/categoria', verifica_token, (req, res) => {
  //regresa nueva categoria
  //req.usuario._id
  let body = req.body

  let categoria = new Categoria({
    descripcion: body.descripcion,
    usuario: req.usuario._id
  })

  categoria.save((err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      categoria: categoriaDB
    })
  })

})

app.put('/categoria/:id', verifica_token, (req, res) => {
  //nombre de la categoria

  let id = req.params.id
  let body = req.body
  let descCategoria = {
    descripcion: body.descripcion
  }

  Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      categoria: categoriaDB
    })

  })

})

app.delete('/categoria/:id', [verifica_token, verifica_admin_role], (req, res) => {
  //solo un admin puede borrar categoria
  let id = req.params.id
  // {new: true} Muetra el usuario ya actualizado.
  Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      categoria: categoriaDB
    })

  })

})

module.exports = app