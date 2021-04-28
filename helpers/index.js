
const dbValidators = require('./db-validators')
const generarJWT   = require('./generar-jwt')
const googleVerify = require('./google-verify')
const subriArchivo = require('./subir-archivo')

module.exports = {
    ...dbValidators, 
    ...generarJWT, 
    ...googleVerify, 
    ...subriArchivo
}