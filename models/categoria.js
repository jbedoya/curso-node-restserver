const { Schema, model, SchemaType} = require('mongoose')

const CategoriaSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

// para remover el __v y el estado de la categoria devuelta, se sobreecribe el metodo toJSON
CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...categoria } = this.toObject()
    return categoria
}

module.exports = model( 'Categoria', CategoriaSchema )