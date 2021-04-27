const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos')
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators')

const router = Router()


//obtener todas las productos - publico
router.get('/', obtenerProductos)

//obtener un producto por id - publico
router.get('/:id',[
    check('id', 'No es un Mongo ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],  obtenerProducto)

//crear producto - privado - cualquier con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un Mongo ID valido de categoria').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto )

//actualizar producto - privado - cualquier con token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto)

//borrar productos - privado - Admin con token
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto)

module.exports = router