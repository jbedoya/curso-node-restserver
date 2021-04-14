const {response, request} = require('express')

const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')


const usuariosGet = async(req = request, res= response) => {
    const { limite=5, desde=0 } = req.query
    const query = { estado: true }
    // const usuarios = await Usuario.find( query)
    //     .skip(Number(desde))
    //     .limit(Number(limite))
    // const total = await Usuario.count( query)
    // res.json({
    //     total, 
    //     usuarios
    // })
    const [ total, usuarios ] = await Promise.all([
        Usuario.count( query),
        Usuario.find( query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })

}

const usuariosPost = async (req, res= response) => {

    const {nombre, correo, clave, rol} = req.body
    const usuario = new Usuario( {nombre, correo, clave, rol} )


    //encriptar la clave
    const salt = bcryptjs.genSaltSync();
    usuario.clave = bcryptjs.hashSync(clave, salt)

    //guardar en DB
    await usuario.save()

    res.json( usuario )
}

const usuariosPut = async(req, res= response) => {
    const { id } = req.params
    const { _id, clave, google, correo, ...resto } = req.body

    // validad en la BD
    if ( clave ) {
        //encriptar la clave
        const salt = bcryptjs.genSaltSync();
        resto.clave = bcryptjs.hashSync(clave, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        usuario
    })
}

const usuariosDelete = async(req, res= response) => {

    const { id } = req.params
    // const usuario = await Usuario.findByIdAndDelete ( id )
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json({
        usuario
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