const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async( correo = '' ) => {

    //verificar si existe correo
    const existeCorreo = await Usuario.findOne({correo})
    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya esta registrado en la BD`)
    }   
}

const existeusuarioPorId = async( id ) => {

    //verificar si existe 
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`No existe el usuario con el id: ${id}`)
    }   
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeusuarioPorId
}