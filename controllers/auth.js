const {response} = require('express')
const Usuario = require('../models/usuario')

const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt')

const login = async(req, res = response ) => {

    const {correo, clave} = req.body

    try {

        //verificar que el email existe
        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Clave no son correctos : correo'
            })
        }

        //verificar si el usuario es activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Clave no son correctos : estado inactivo'
            })
        }
        //verificar la clave
        const validClave = bcryptjs.compareSync(clave, usuario.clave)
        if (!validClave) {
            return res.status(400).json({
                msg: 'Usuario / Clave no son correctos : clave errada'
            })
        }

        //generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal, Error: '+error
        })        
    }

}

module.exports = {
    login
}