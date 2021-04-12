const {response, request} = require('express')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGet = (req = request, res= response) => {
    const {q, nombre='sin nombre', apikey,pag=1,limit} = req.query
    res.json({
        msg: 'get API -controlador',
        q,nombre,apikey,pag,limit
    })
}

const usuariosPost = async (req, res= response) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json( errors )
    }
    const {nombre, correo, clave, rol} = req.body
    const usuario = new Usuario( {nombre, correo, clave, rol} )

    //verificar si existe correo
    const existeCorreo = await Usuario.findOne({correo})
    if (existeCorreo) {
        return res.status(404).json({
            msg: 'Ese correo ya esta registrado'
        })
    }

    //encriptar la clave
    const salt = bcryptjs.genSaltSync();
    usuario.clave = bcryptjs.hashSync(clave, salt)

    //guardar en DB
    await usuario.save()

    res.json({
        msg: 'post API -controlador local',
        usuario
    })
}

const usuariosPut = (req, res= response) => {
    const { id } = req.params
    res.json({
        msg: 'put API -controlador',
        id
    })
}

const usuariosDelete = (req, res= response) => {
    res.json({
        msg: 'delete API -controlador'
    })
}

const usuariosPatch = (req, res= response) => {
    res.json({
        msg: 'patch API -controlador'
    })
}

module.exports = {
    usuariosGet, 
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}