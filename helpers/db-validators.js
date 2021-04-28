const Role = require('../models/role')
const { Usuario, Categoria, Producto} = require('../models')

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

const existeCategoriaPorId = async( id ) => {

    //verificar si existe
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria) {
       throw new Error(`No existe la categoria con el id: ${id}`)
    }   
}

const existeProductoPorId = async( id ) => {

    //verificar si existe
    const existeProducto = await Producto.findById(id)
    if (!existeProducto) {
       throw new Error(`No existe el producto con el id: ${id}`)
    }   
}

const coleccionesPermitidas = (coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes(coleccion)
    if (!incluida ) {
        throw new Error(`La coleccion ${coleccion} no es permitida. Solo: ${colecciones}`)
    }
    return true

}

module.exports = {
    esRoleValido,
    emailExiste,
    existeusuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}