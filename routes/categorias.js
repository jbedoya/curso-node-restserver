const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos } = require('../middlewares')

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')

const router = Router()


//obtener todas las categorias - publico
router.get('/', obtenerCategorias)

//obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],  obtenerCategoria)

//crear categoria - privado - cualquier con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria )

//actualizar categoria - privado - cualquier con token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria)

//borrar categorias - privado - Admin con token
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria)

module.exports = router