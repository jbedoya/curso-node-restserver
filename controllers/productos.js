const { response, request } = require('express')
const { Producto } = require('../models')

//obtenerProductos - paginado - total - populate
const obtenerProductos = async( req, res = response ) => {
    const { limite=5, desde=0 } = req.query
    const query = { estado: true }

    const [ total, productos ] = await Promise.all([
        Producto.count( query ),
        Producto.find( query )
        .skip(Number(desde))
        .limit(Number(limite))
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
    ])

    res.json({
        total, 
        productos
    })
}

//obtenerProducto - populate()
const obtenerProducto = async( req, res = response ) => {
    const { id } = req.params

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')

    res.json({
        producto
    })
}

//creaProducto - populate()
const crearProducto = async(req, res = response ) => {

    const { estado, usuario, ...data } = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id

    const productoDB = await Producto.findOne({ nombre: data.nombre })
    if ( productoDB ){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }

    //crear el producto
    const producto = new Producto( data )

    //guardar en BD
    await producto.save()

    res.status(201).json( producto )

}

//actualizarProducto
const actualizarProducto = async( req, res = response ) => {
    const { id } = req.params
    const { estado, usuario, ...data } = req.body

    if (data.nombre){
        data.nombre = data.nombre.toUpperCase()
        const productoDB = await Producto.findOne( {nombre: data.nombre })
        if ( productoDB ){
            return res.status(400).json({
                msg: `La producto ${productoDB.nombre} ya existe`
            })
        }    
    }
    data.usuario = req.usuario._id
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.json({ producto })
}

//borrarProducto - estado: false
const borrarProducto = async( req, res) => {
    const { id } = req.params

    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.json({ productoBorrado })

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}