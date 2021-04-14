const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            msg: 'No hay Token en la peticion'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY)

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid)

        //verificar si el usuario exista en la bd
        if (!usuario) {
            return res.status(401).json({
                msg: 'token no valido - usuario no existe en la BD'
            })    
        }

        //verificar si el uid tiene estado true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'token no valido - usuario no activo'
            })    
        }

        req.usuario = usuario
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}