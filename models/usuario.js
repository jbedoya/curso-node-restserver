
const { Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    clave: {
        type: String,
        required: [true, 'La clave es obligatoria'],
    },
    imagen: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
        
    },
    google: {
        type: Boolean,
        default: false,
        
    },
})

// para remover el __v y la clave del usuario devuelto, se sobreecribe el metodo toJSON
UsuarioSchema.methods.toJSON = function() {
    const { __v, clave, _id, ...usuario } = this.toObject()
    usuario.uid = _id
    return usuario
}

module.exports = model( 'Usuario', UsuarioSchema )