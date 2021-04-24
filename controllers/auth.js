const {response} = require('express')
const Usuario = require('../models/usuario')

const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')

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

const googleSignin = async (req, res = response) => {

   const { id_token } = req.body;

    try {
        const { nombre, correo, img } = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ correo })

        if( !usuario ){
            //tengo que crearlo
            const data = {
                nombre,
                correo,
                clave: ':P',
                imagen: img,
                google: true
            }

            usuario = new Usuario( data )
            await usuario.save()
        }

        //si el usuario no esta activo
        if( !usuario.estado ) {
            res.status(400).json({
                msg: 'hable con el Administrador, usuario bloqueado'
            })    
        }

        //generar el jwt
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es valido'
        })
        
    }
    
}

module.exports = {
    login,
    googleSignin
}